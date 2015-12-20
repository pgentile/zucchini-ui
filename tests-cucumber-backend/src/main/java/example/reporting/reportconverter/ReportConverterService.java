package example.reporting.reportconverter;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.reporting.feature.FeatureDAO;
import example.reporting.reportconverter.converter.ConversionResult;
import example.reporting.reportconverter.converter.ReportConverter;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.scenario.ScenarioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@Component
public class ReportConverterService {

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

    public void convertAndSaveFeatures(final String testRunId, final InputStream featureStream) {

        final JavaType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);
        try {
            final List<ReportFeature> reportFeatures = objectMapper.readValue(featureStream, featureListJavaType);
            reportFeatures.forEach(reportFeature -> convertAndSaveFeature(testRunId, reportFeature));
        } catch (final IOException e) {
            throw new IllegalStateException("Can't parse report feature stream", e);
        }
    }

    private void convertAndSaveFeature(final String testRunId, final ReportFeature reportFeature) {
        final ConversionResult conversionResult = reportConverter.convert(testRunId, reportFeature);

        featureDAO.save(conversionResult.getFeature());
        conversionResult.getScenarii().forEach(scenarioDAO::save);
    }

}
