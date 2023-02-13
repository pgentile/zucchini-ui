package io.zucchiniui.backend.reportconverter.domainimpl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureRepository;
import io.zucchiniui.backend.feature.domain.FeatureService;
import io.zucchiniui.backend.reportconverter.converter.ConversionResult;
import io.zucchiniui.backend.reportconverter.converter.ReportConverter;
import io.zucchiniui.backend.reportconverter.domain.ReportConverterService;
import io.zucchiniui.backend.reportconverter.report.ReportFeature;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioRepository;
import io.zucchiniui.backend.scenario.domain.ScenarioService;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;


@Component
class ReportConverterServiceImpl implements ReportConverterService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportConverterServiceImpl.class);

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    private final ScenarioRepository scenarioRepository;

    private final ScenarioService scenarioService;

    private final ReportConverter reportConverter;

    private final ObjectMapper objectMapper;

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
        final Optional<String> group,
        final boolean dryRun,
        final boolean onlyNewScenarii,
        final boolean mergeOnlyNewPassedScenarii) {
        final CollectionType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);
        try {
            final List<ReportFeature> reportFeatures = objectMapper.readValue(featureStream, featureListJavaType);
            for (final ReportFeature reportFeature : reportFeatures) {
                convertAndSaveFeature(testRunId, reportFeature, group, dryRun, onlyNewScenarii, mergeOnlyNewPassedScenarii);
            }
        } catch (final IOException e) {
            throw new IllegalStateException("Can't parse report feature stream", e);
        }
    }

    private void convertAndSaveFeature(
        final String testRunId,
        final ReportFeature reportFeature,
        final Optional<String> group,
        final boolean dryRun,
        final boolean onlyNewScenarii,
        final boolean mergeOnlyNewPassedScenarii
    ) {
        final ConversionResult conversionResult = reportConverter.convert(testRunId, group, reportFeature);

        if (dryRun) {
            conversionResult.scenarii().forEach(s -> {
                s.doIgnoringChanges(ignored -> {
                    s.setStatus(ScenarioStatus.NOT_RUN);
                });
            });
        }

        // If feature has been merged to an existing feature, re-link scenarii to this existing feature
        final Feature feature = featureService.tryToMergeWithExistingFeature(conversionResult.feature());
        if (!conversionResult.feature().equals(feature)) {
            conversionResult.scenarii().forEach(s -> s.setFeatureId(feature.getId()));
        }

        saveScenariiIfNeeded(conversionResult.scenarii(), onlyNewScenarii, mergeOnlyNewPassedScenarii);

        featureService.calculateStatusFromScenarii(feature);
        featureRepository.save(feature);

        featureService.updateScenariiWithFeatureTags(feature);
    }

    private void saveScenariiIfNeeded(final List<Scenario> allScenarii, final boolean onlyNewScenarii, final boolean mergeOnlyNewPassedScenarii) {
        for (final Scenario scenario : allScenarii) {
            final Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(scenario, mergeOnlyNewPassedScenarii);
            if (!onlyNewScenarii || mergedScenario.equals(scenario)) {
                scenarioRepository.save(mergedScenario);
            } else {
                LOGGER.debug("Scenario {} will not be imported", scenario);
            }
        }
    }

}
