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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@Component
class ReportConverterServiceImpl implements ReportConverterService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportConverterServiceImpl.class);

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
    public void convertAndSaveFeatures(
        final String testRunId,
        final InputStream featureStream,
        final String group,
        final boolean dryRun,
        final boolean onlyNewScenarii
    ) {
        final JavaType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);
        try {
            final List<ReportFeature> reportFeatures = objectMapper.readValue(featureStream, featureListJavaType);
            for (final ReportFeature reportFeature : reportFeatures) {
                convertAndSaveFeature(testRunId, reportFeature, group, dryRun, onlyNewScenarii);
            }
        } catch (final IOException e) {
            throw new IllegalStateException("Can't parse report feature stream", e);
        }
    }

    private void convertAndSaveFeature(
        final String testRunId,
        final ReportFeature reportFeature,
        final String group,
        final boolean dryRun,
        final boolean onlyNewScenarii
    ) {
        final ConversionResult conversionResult = reportConverter.convert(testRunId, group, reportFeature);

        if (dryRun) {
            conversionResult.getScenarii().forEach(s -> s.changeStatus(ScenarioStatus.NOT_RUN));
        }

        // If feature has been merged to an existing feature, re-link scenarii to this existing feature
        final Feature feature = featureService.tryToMergeWithExistingFeature(conversionResult.getFeature());
        if (!conversionResult.getFeature().equals(feature)) {
            conversionResult.getScenarii().forEach(s -> s.setFeatureId(feature.getId()));
        }

        saveScenariiIfNeeded(conversionResult.getScenarii(), onlyNewScenarii);

        featureService.calculateStatusFromScenarii(feature);
        featureRepository.save(feature);

        featureService.updateScenariiWithFeatureTags(feature);
    }

    private void saveScenariiIfNeeded(final List<Scenario> allScenarii, final boolean onlyNewScenarii) {
        for (final Scenario scenario : allScenarii) {
            final Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(scenario);
            if (!onlyNewScenarii || mergedScenario.equals(scenario)) {
                mergedScenario.calculateStatusFromSteps();
                scenarioRepository.save(mergedScenario);
            } else {
                LOGGER.debug("Scenario {} will not be imported", scenario);
            }
        }
    }

}
