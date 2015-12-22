package example.reporting.reportconverter;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.reporting.api.feature.Feature;
import example.reporting.api.scenario.Scenario;
import example.reporting.feature.FeatureDAO;
import example.reporting.reportconverter.converter.ConversionResult;
import example.reporting.reportconverter.converter.ReportConverter;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.scenario.ScenarioDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@Component
public class ReportConverterService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportConverterService.class);

    private final FeatureDAO featureDAO;

    private final ScenarioDAO scenarioDAO;

    private final ReportConverter reportConverter;

    private final ObjectMapper objectMapper;

    @Autowired
    public ReportConverterService(
        final FeatureDAO featureDAO,
        final ScenarioDAO scenarioDAO,
        final ReportConverter reportConverter,
        @Qualifier("reportObjectMapper") final ObjectMapper objectMapper
    ) {
        this.featureDAO = featureDAO;
        this.scenarioDAO = scenarioDAO;
        this.reportConverter = reportConverter;
        this.objectMapper = objectMapper;
    }

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
        featureDAO.save(conversionResult.getFeature());

        conversionResult.getScenarii().forEach(scenario -> {
            final String featureId = conversionResult.getFeature().getId();

            // Re-link to feature, if merged
            scenario.setFeatureId(featureId);

            mergeScenario(featureId, scenario);
            scenario.calculateStatusFromSteps();
            scenarioDAO.save(scenario);
        });
    }

    private void mergeFeature(final String testRunId, Feature newFeature) {
        final Feature existingFeature = featureDAO.findOneByTestRunIdAndKey(testRunId, newFeature.getFeatureKey());
        if (existingFeature != null) {
            LOGGER.info("Merging new feature {} with existing feature {}", newFeature.getId(), existingFeature.getId());
            newFeature.setId(existingFeature.getId());
        }
    }

    private void mergeScenario(String featureId, Scenario newScenario) {
        final Scenario existingScenario = scenarioDAO.findByFeatureIdAndKey(featureId, newScenario.getScenarioKey());
        if (existingScenario != null) {
            LOGGER.info("Merging new scenario {} with existing feature {}", newScenario.getId(), existingScenario.getId());
            newScenario.setId(existingScenario.getId());
        }
    }

}
