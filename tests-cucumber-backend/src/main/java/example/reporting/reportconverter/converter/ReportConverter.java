package example.reporting.reportconverter.converter;

import example.reporting.feature.domain.Feature;
import example.reporting.reportconverter.report.ReportBackground;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.reportconverter.report.ReportFeatureElement;
import example.reporting.reportconverter.report.ReportScenario;
import example.reporting.scenario.domain.Background;
import example.reporting.scenario.domain.Scenario;
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

    private final BoundMapperFacade<ReportScenario, Scenario> scenarioMapper;

    private final BoundMapperFacade<ReportBackground, Background> backgroundMapper;

    @Autowired
    public ReportConverter(final ReportMapper reportMapper) {
        featureMapper = reportMapper.dedicatedMapperFor(ReportFeature.class, Feature.class, false);
        scenarioMapper = reportMapper.dedicatedMapperFor(ReportScenario.class, Scenario.class, false);
        backgroundMapper = reportMapper.dedicatedMapperFor(ReportBackground.class, Background.class, false);
    }

    public ConversionResult convert(
        final String testRunId,
        final ReportFeature reportFeature
    ) {
        final Feature feature = mapFeature(testRunId, reportFeature);
        final List<Scenario> scenarii = convertFeatureElementsToScenarii(feature, reportFeature.getElements());
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
        final List<ReportFeatureElement> reportFeatureElements
    ) {

        final List<Scenario> scenarii = new ArrayList<>(reportFeatureElements.size());

        final Map<Object, Object> globalProperties = new HashMap<>();
        globalProperties.put(MappingContextKey.TEST_RUN_ID, feature.getTestRunId());
        globalProperties.put(MappingContextKey.FEATURE_ID, feature.getId());

        final MappingContextFactory mappingContextFactory = new NonCyclicMappingContext.Factory(globalProperties);

        Background currentBackground = null;
        for (final ReportFeatureElement reportFeatureElement : reportFeatureElements) {
            if (reportFeatureElement instanceof ReportScenario) {
                final Scenario scenario = map(mappingContextFactory, scenarioMapper, (ReportScenario) reportFeatureElement);
                if (currentBackground != null) {
                    scenario.setBackground(currentBackground);
                }
                scenarii.add(scenario);
            } else if (reportFeatureElement instanceof ReportBackground) {
                currentBackground = map(mappingContextFactory, backgroundMapper, (ReportBackground) reportFeatureElement);
            } else {
                throw new IllegalStateException("Unhandled type: " + reportFeatureElement);
            }
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
