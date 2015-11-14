package example.reporting.reportconverter.converter;

import example.reporting.feature.domain.FeatureFactory;
import example.reporting.feature.model.Feature;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.reportconverter.report.ReportFeatureElement;
import example.reporting.scenario.domain.ScenarioRepository;
import example.reporting.scenario.model.Background;
import example.reporting.scenario.model.FeatureElement;
import example.reporting.scenario.model.Scenario;
import ma.glasnost.orika.BoundMapperFacade;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.MappingContextFactory;
import ma.glasnost.orika.impl.NonCyclicMappingContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReportConverter {

    private final BoundMapperFacade<ReportFeature, Feature> featureMapper;

    private final BoundMapperFacade<ReportFeatureElement, FeatureElement> featureElementMapper;

    public ReportConverter(final FeatureFactory featureFactory, final ScenarioRepository scenarioRepository) {
        final ReportMapper reportMapper = new ReportMapper(featureFactory, scenarioRepository);
        reportMapper.initMapper();

        featureMapper = reportMapper.dedicatedMapperFor(ReportFeature.class, Feature.class, false);
        featureElementMapper = reportMapper.dedicatedMapperFor(ReportFeatureElement.class, FeatureElement.class, false);
    }

    public ConversionResult convert(final String testRunId, final ReportFeature reportFeature) {
        final Feature feature = mapFeature(testRunId, reportFeature);
        final List<Scenario> scenarii = convertFeatureElementsToScenarii(testRunId, feature.getId(), reportFeature.getElements());
        return new ConversionResult(feature, scenarii);
    }

    private Feature mapFeature(final String testRunId, final ReportFeature reportFeature) {
        final Map<Object, Object> globalProperties = new HashMap<>();
        globalProperties.put(MappingContextKey.TEST_RUN_ID, testRunId);

        final MappingContextFactory mappingContextFactory =  new NonCyclicMappingContext.Factory(globalProperties);

        return map(mappingContextFactory, featureMapper, reportFeature);
    }

    private List<Scenario> convertFeatureElementsToScenarii(
            final String testRunId,
            final String featureId,
            final List<ReportFeatureElement> reportFeatureElements
    ) {
        Background currentBackground = null;

        final List<Scenario> scenarii = new ArrayList<>(reportFeatureElements.size());

        final Map<Object, Object> globalProperties = new HashMap<>();
        globalProperties.put(MappingContextKey.TEST_RUN_ID, testRunId);
        globalProperties.put(MappingContextKey.FEATURE_ID, featureId);

        final MappingContextFactory mappingContextFactory = new NonCyclicMappingContext.Factory(globalProperties);

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
