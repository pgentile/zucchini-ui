package example.reporting;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import example.reporting.feature.domain.FeatureFactory;
import example.reporting.reportconverter.converter.ConversionResult;
import example.reporting.reportconverter.converter.ReportConverter;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.scenario.domain.ScenarioFactory;
import example.reporting.testrun.domain.TestRunFactory;
import example.reporting.testrun.model.TestRun;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.List;

public class ReportingMain {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportingMain.class);

    private final ObjectMapper objectMapper;

    public ReportingMain() {
        objectMapper = createObjectMapper();
    }

    public static void main(final String... args) throws Exception {
        final String filename = args[0];
        if (filename == null) {
            throw new IllegalArgumentException("Filename to parse not defined");
        }

        final ReportingMain reportingMain = new ReportingMain();
        reportingMain.parse(filename);
    }

    public void parse(final String filename) throws Exception {
        LOGGER.info("Parsing de {}...", filename);

        final JavaType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);
        final List<ReportFeature> reportFeatures = objectMapper.readValue(new File(filename), featureListJavaType);

        final TestRunFactory testRunFactory = new TestRunFactory();
        final FeatureFactory featureFactory = new FeatureFactory();
        final ScenarioFactory scenarioFactory = new ScenarioFactory();

        final ReportConverter reportConverter = new ReportConverter(featureFactory, scenarioFactory);

        final TestRun testRun = testRunFactory.create("TEST");

        for (final ReportFeature reportFeature : reportFeatures) {
            final ConversionResult conversionResult = reportConverter.convert(testRun.getId(), reportFeature);
            System.out.println(objectMapper.writeValueAsString(conversionResult));
            System.out.println();
        }
    }

    private ObjectMapper createObjectMapper() {
        return new ObjectMapper()
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                .disable(SerializationFeature.CLOSE_CLOSEABLE)
                .enable(SerializationFeature.INDENT_OUTPUT);
    }

}
