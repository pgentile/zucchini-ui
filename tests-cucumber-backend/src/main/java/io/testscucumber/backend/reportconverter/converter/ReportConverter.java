package io.testscucumber.backend.reportconverter.converter;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.reportconverter.report.ReportBackground;
import io.testscucumber.backend.reportconverter.report.ReportFeature;
import io.testscucumber.backend.reportconverter.report.ReportFeatureElement;
import io.testscucumber.backend.reportconverter.report.ReportScenario;
import io.testscucumber.backend.scenario.domain.Background;
import io.testscucumber.backend.scenario.domain.Scenario;
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
import java.util.Optional;


@Component
public class ReportConverter {

    private final ReportFeatureConverter reportFeatureConverter;

    private final BoundMapperFacade<ReportScenario, Scenario> scenarioMapper;

    private final BoundMapperFacade<ReportBackground, Background> backgroundMapper;

    @Autowired
    public ReportConverter(final ReportFeatureConverter reportFeatureConverter, final ReportMapper reportMapper) {
        this.reportFeatureConverter = reportFeatureConverter;
        scenarioMapper = reportMapper.dedicatedMapperFor(ReportScenario.class, Scenario.class, false);
        backgroundMapper = reportMapper.dedicatedMapperFor(ReportBackground.class, Background.class, false);
    }

    public ConversionResult convert(
        final String testRunId,
        final Optional<String> group,
        final ReportFeature reportFeature
    ) {
        final Feature feature = reportFeatureConverter.convert(testRunId, group, reportFeature);
        final List<Scenario> scenarii = convertFeatureElementsToScenarii(feature, reportFeature.getElements());
        return new ConversionResult(feature, scenarii);
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
