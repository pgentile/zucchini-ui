package io.testscucumber.backend.reportconverter.domainimpl;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.reportconverter.converter.ConversionResult;
import io.testscucumber.backend.reportconverter.converter.ReportConverter;
import io.testscucumber.backend.reportconverter.domain.ReportConverterService;
import io.testscucumber.backend.reportconverter.report.ReportFeature;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.domain.ScenarioService;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@Component
class ReportConverterServiceImpl implements ReportConverterService {

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    private final ScenarioRepository scenarioRepository;

    private final ScenarioService scenarioService;

    private final ReportConverter reportConverter;

    private final ObjectMapper objectMapper;

    @Autowired
    public ReportConverterServiceImpl(
        final FeatureRepository featureRepository,
        final FeatureService featureService,
        final ScenarioRepository scenarioRepository,
        final ScenarioService scenarioService, final ReportConverter reportConverter,
        @Qualifier("reportObjectMapper") final ObjectMapper objectMapper
    ) {
        this.featureRepository = featureRepository;
        this.featureService = featureService;
        this.scenarioRepository = scenarioRepository;
        this.scenarioService = scenarioService;
        this.reportConverter = reportConverter;
        this.objectMapper = objectMapper;
    }

    @Override
    public void convertAndSaveFeatures(final String testRunId, final InputStream featureStream, final boolean dryRun) {

        final JavaType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);
        try {
            final List<ReportFeature> reportFeatures = objectMapper.readValue(featureStream, featureListJavaType);
            reportFeatures.forEach(reportFeature -> convertAndSaveFeature(testRunId, reportFeature, dryRun));
        } catch (final IOException e) {
            throw new IllegalStateException("Can't parse report feature stream", e);
        }
    }

    private void convertAndSaveFeature(final String testRunId, final ReportFeature reportFeature, final boolean dryRun) {
        final ConversionResult conversionResult = reportConverter.convert(testRunId, reportFeature);

        if (dryRun) {
            conversionResult.getScenarii().forEach(s -> s.changeStatus(ScenarioStatus.NOT_RUN));
        }

        final Feature feature = featureService.tryToMergeWithExistingFeature(conversionResult.getFeature());

        if (feature != conversionResult.getFeature()) {
            // Re-link to feature, if merged
            conversionResult.getScenarii().forEach(s -> s.setFeatureId(feature.getId()));
        }

        conversionResult.getScenarii().forEach(s -> {
            final Scenario scenario = scenarioService.tryToMergeWithExistingScenario(s);
            scenario.calculateStatusFromSteps();
            scenarioRepository.save(scenario);
        });

        featureService.calculateStatusFromScenarii(feature);
        featureRepository.save(feature);
    }

}
