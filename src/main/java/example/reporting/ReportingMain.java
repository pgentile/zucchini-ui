package example.reporting;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import example.reporting.model.TestRun;
import example.reporting.report.ReportFeature;
import example.reporting.reporttomodel.ConversionResult;
import example.reporting.reporttomodel.ReportConverter;
import example.reporting.services.TestRunFactory;
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
        final TestRun testRun = testRunFactory.create("TEST");

        final ReportConverter reportConverter = new ReportConverter();

        for (final ReportFeature reportFeature: reportFeatures) {
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
