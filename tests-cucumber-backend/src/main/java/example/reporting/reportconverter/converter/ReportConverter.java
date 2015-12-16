package example.reporting.reportconverter.converter;

import example.reporting.feature.FeatureFactory;
import example.reporting.api.feature.Feature;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.reportconverter.report.ReportFeatureElement;
import example.reporting.scenario.ScenarioFactory;
import example.reporting.api.scenario.Background;
import example.reporting.api.scenario.FeatureElement;
import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.Step;
import example.reporting.api.scenario.StepStatus;
import ma.glasnost.orika.BoundMapperFacade;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.MappingContextFactory;
import ma.glasnost.orika.impl.NonCyclicMappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class ReportConverter {

    private final BoundMapperFacade<ReportFeature, Feature> featureMapper;

    private final BoundMapperFacade<ReportFeatureElement, FeatureElement> featureElementMapper;

    @Autowired
    public ReportConverter(final FeatureFactory featureFactory, final ScenarioFactory scenarioFactory) {
        final ReportMapper reportMapper = new ReportMapper(featureFactory, scenarioFactory);
        reportMapper.initMapper();

        featureMapper = reportMapper.dedicatedMapperFor(ReportFeature.class, Feature.class, false);
        featureElementMapper = reportMapper.dedicatedMapperFor(ReportFeatureElement.class, FeatureElement.class, false);
    }

    public ConversionResult convert(final String testRunId, final ReportFeature reportFeature) {
        final Feature feature = mapFeature(testRunId, reportFeature);
        final List<Scenario> scenarii = convertFeatureElementsToScenarii(feature, reportFeature.getElements());
        return new ConversionResult(feature, scenarii);
    }

    private Feature mapFeature(final String testRunId, final ReportFeature reportFeature) {
        final Map<Object, Object> globalProperties = new HashMap<>();
        globalProperties.put(MappingContextKey.TEST_RUN_ID, testRunId);

        final MappingContextFactory mappingContextFactory = new NonCyclicMappingContext.Factory(globalProperties);

        return map(mappingContextFactory, featureMapper, reportFeature);
    }

    private List<Scenario> convertFeatureElementsToScenarii(
            final Feature feature,
            final List<ReportFeatureElement> reportFeatureElements
    ) {

        final List<Scenario> scenarii = new ArrayList<>(reportFeatureElements.size());

        final Map<Object, Object> globalProperties = new HashMap<>();
        globalProperties.put(MappingContextKey.TEST_RUN_ID, feature.getTestRunId());
        globalProperties.put(MappingContextKey.FEATURE_ID, feature.getId());

        final MappingContextFactory mappingContextFactory = new NonCyclicMappingContext.Factory(globalProperties);

        Background currentBackground = null;
        for (final ReportFeatureElement reportFeatureElement : reportFeatureElements) {
            final FeatureElement featureElement = map(mappingContextFactory, featureElementMapper, reportFeatureElement);
            if (featureElement instanceof Scenario) {
                final Scenario scenario = (Scenario) featureElement;
                if (currentBackground != null) {
                    scenario.setBackground(currentBackground);
                }
                scenarii.add(scenario);
            } else if (featureElement instanceof Background) {
                currentBackground = (Background) featureElement;
            } else {
                throw new IllegalStateException("Unhandled type: " + featureElement);
            }
        }

        // Statut pour tous les scenarii
        // Suppression des tags qui se répètent entre les scenarii et la feature
        scenarii.forEach(scenario -> {
            scenario.setStatus(calculateScenarioStatus(scenario));
            scenario.getTags().removeAll(feature.getTags());
        });

        return scenarii;
    }

    private static StepStatus calculateScenarioStatus(Scenario scenario) {
        final List<StepStatus> innerStatus = new ArrayList<>();
        if (scenario.getBackground() != null) {
            scenario.getBackground().getSteps().stream().map(Step::getStatus).forEach(innerStatus::add);
        }
        scenario.getSteps().stream().map(Step::getStatus).forEach(innerStatus::add);

        for (final StepStatus oneInnerStatus : innerStatus) {
            switch (oneInnerStatus) {
                case FAILED:
                case UNDEFINED:
                    return StepStatus.FAILED;
                case PENDING:
                    return StepStatus.PENDING;
                default:
                    // Rien à faire, on continue
                    break;
            }
        }

        // Tous les steps ont fonctionné : c'est good !
        if (innerStatus.stream().allMatch(StepStatus.PASSED::equals)) {
            return StepStatus.PASSED;
        }

        // Si tous les steps du scénario sont skipped, alors skipped
        if (scenario.getSteps().stream().map(Step::getStatus).allMatch(StepStatus.SKIPPED::equals)) {
            return StepStatus.SKIPPED;
        }

        return StepStatus.FAILED;
    }

    private static <A, B> B map(final MappingContextFactory mappingContextFactory, final BoundMapperFacade<A, B> mapperFacade, final A source) {
        final MappingContext mappingContext = mappingContextFactory.getContext();
        try {
            return mapperFacade.map(source, mappingContext);
        } finally {
            mappingContextFactory.release(mappingContext);
        }
    }

}
