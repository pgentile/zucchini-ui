package example.reporting;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.reporting.cucumberreport.AroundAction;
import example.reporting.cucumberreport.Feature;
import example.reporting.cucumberreport.ScenarioElement;
import example.reporting.cucumberreport.Step;
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

    public static void main(String... args) throws Exception {
        final String filename = args[0];
        if (filename == null) {
            throw new IllegalArgumentException("Filename to parse not defined");
        }

        final ReportingMain reportingMain = new ReportingMain();
        reportingMain.parse(filename);
    }

    public void parse(String filename) throws Exception {
        LOGGER.info("Parsing de {}...", filename);
        final JavaType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, Feature.class);
        final List<Feature> features = objectMapper.readValue(new File(filename), featureListJavaType);
        for (final Feature feature: features) {
            LOGGER.info("  Found feature: {}", feature);
            for (ScenarioElement element: feature.getElements()) {
                LOGGER.info("    Found element: {}", element);
                for (AroundAction action: element.getBeforeActions()) {
                    LOGGER.info("      Found before: {}", action);
                }
                for (Step step: element.getSteps()) {
                    LOGGER.info("      Found step  : {}", step);
                }
                for (AroundAction action: element.getAfterActions()) {
                    LOGGER.info("      Found after : {}", action);
                }
            }
        }
    }

    private ObjectMapper createObjectMapper() {
        return new ObjectMapper()
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

}
