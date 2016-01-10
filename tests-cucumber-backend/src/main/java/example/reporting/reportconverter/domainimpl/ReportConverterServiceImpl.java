package example.reporting.reportconverter.domainimpl;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureRepository;
import example.reporting.reportconverter.converter.ConversionResult;
import example.reporting.reportconverter.converter.ReportConverter;
import example.reporting.reportconverter.domain.ReportConverterService;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domain.ScenarioRepository;
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

    private final ScenarioRepository scenarioRepository;

    private final ReportConverter reportConverter;

    private final ObjectMapper objectMapper;

    @Autowired
    public ReportConverterServiceImpl(
        final FeatureRepository featureRepository,
        final ScenarioRepository scenarioRepository,
        final ReportConverter reportConverter,
        @Qualifier("reportObjectMapper") final ObjectMapper objectMapper
    ) {
        this.featureRepository = featureRepository;
        this.scenarioRepository = scenarioRepository;
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
        final ConversionResult conversionResult = reportConverter.convert(testRunId, reportFeature, dryRun);

        mergeFeature(testRunId, conversionResult.getFeature());
        featureRepository.save(conversionResult.getFeature());

        conversionResult.getScenarii().forEach(scenario -> {
            final String featureId = conversionResult.getFeature().getId();

            // Re-link to feature, if merged
            scenario.setFeatureId(featureId);

            mergeScenario(featureId, scenario);
            scenario.calculateStatusFromSteps();
            scenarioRepository.save(scenario);
        });
    }

    private void mergeFeature(final String testRunId, Feature newFeature) {
        featureRepository.query()
            .withTestRunId(testRunId)
            .withFeatureKey(newFeature.getFeatureKey())
            .tryToFindOne()
            .ifPresent(existingFeature -> {
                LOGGER.info("Merging new feature {} with existing feature {}", newFeature, existingFeature);
                newFeature.setId(existingFeature.getId());
            });
    }

    private void mergeScenario(String featureId, Scenario newScenario) {
        scenarioRepository.query()
            .withFeatureId(featureId)
            .withScenarioKey(newScenario.getScenarioKey())
            .tryToFindOne()
            .ifPresent(existingScenario -> {
                LOGGER.info("Merging new scenario {} with existing feature {}", newScenario, existingScenario);
                newScenario.setId(existingScenario.getId());
            });
    }

}
