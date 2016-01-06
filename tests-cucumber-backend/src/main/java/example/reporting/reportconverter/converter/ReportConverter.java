package example.reporting.reportconverter.converter;

import example.reporting.api.feature.Feature;
import example.reporting.api.scenario.Background;
import example.reporting.api.scenario.FeatureElement;
import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.StepStatus;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.reportconverter.report.ReportFeatureElement;
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
    public ReportConverter(final ReportMapper reportMapper) {
        featureMapper = reportMapper.dedicatedMapperFor(ReportFeature.class, Feature.class, false);
        featureElementMapper = reportMapper.dedicatedMapperFor(ReportFeatureElement.class, FeatureElement.class, false);
    }

    public ConversionResult convert(
        final String testRunId,
        final ReportFeature reportFeature,
        final boolean dryRun
    ) {
        final Feature feature = mapFeature(testRunId, reportFeature);
        final List<Scenario> scenarii = convertFeatureElementsToScenarii(feature, reportFeature.getElements(), dryRun);
        return new ConversionResult(feature, scenarii);
    }

    private Feature mapFeature(
        final String testRunId,
        final ReportFeature reportFeature
    ) {
        final Map<Object, Object> globalProperties = new HashMap<>();
        globalProperties.put(MappingContextKey.TEST_RUN_ID, testRunId);

        final MappingContextFactory mappingContextFactory = new NonCyclicMappingContext.Factory(globalProperties);

        return map(mappingContextFactory, featureMapper, reportFeature);
    }

    private List<Scenario> convertFeatureElementsToScenarii(
        final Feature feature,
        final List<ReportFeatureElement> reportFeatureElements,
        final boolean dryRun
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

        // Définir le statut non joué si dry run demandé
        if (dryRun) {
            scenarii.forEach(scenario -> {
                if (scenario.getBackground() != null) {
                    scenario.getBackground().getSteps().stream().forEach(step -> step.setStatus(StepStatus.NOT_RUN));
                }
                scenario.getSteps().stream().forEach(step -> step.setStatus(StepStatus.NOT_RUN));
            });
        }

        // Suppression des tags qui se répètent entre les scenarii et la feature
        scenarii.forEach(scenario -> scenario.getTags().removeAll(feature.getTags()));

        return scenarii;
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
