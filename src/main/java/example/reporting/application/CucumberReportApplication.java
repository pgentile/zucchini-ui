package example.reporting.application;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import example.reporting.feature.domain.FeatureDAO;
import example.reporting.feature.domain.FeatureFactory;
import example.reporting.morphia.MorphiaBundle;
import example.reporting.reportconverter.app.ReportConverterAppService;
import example.reporting.reportconverter.converter.ReportConverter;
import example.reporting.scenario.domain.ScenarioDAO;
import example.reporting.scenario.domain.ScenarioFactory;
import example.reporting.testrun.domain.TestRunDAO;
import example.reporting.testrun.domain.TestRunFactory;
import example.reporting.testrun.view.TestRunViewAccess;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.mongodb.morphia.Datastore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CucumberReportApplication extends Application<CucumberReportConfiguration> implements Thread.UncaughtExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(CucumberReportApplication.class);

    public static void main(final String... args) throws Exception {
        final CucumberReportApplication application = new CucumberReportApplication();
        Thread.setDefaultUncaughtExceptionHandler(application);
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<CucumberReportConfiguration> bootstrap) {
        bootstrap.addBundle(new MorphiaBundle());

        bootstrap.getObjectMapper()
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Override
    public void run(final CucumberReportConfiguration cucumberReportConfiguration, final Environment environment) throws Exception {
        final Datastore datastore = cucumberReportConfiguration.getMorphiaDatastoreFactory().build();
        final TestRunDAO testRunDAO = new TestRunDAO(datastore);
        final FeatureDAO featureDAO = new FeatureDAO(datastore);
        final ScenarioDAO scenarioDAO = new ScenarioDAO(datastore);

        final TestRunFactory testRunFactory = new TestRunFactory();
        final FeatureFactory featureFactory = new FeatureFactory();
        final ScenarioFactory scenarioFactory = new ScenarioFactory();
        final ReportConverter reportConverter = new ReportConverter(featureFactory, scenarioFactory);

        final TestRunViewAccess testRunViewAccess = new TestRunViewAccess(testRunDAO, featureDAO);

        final ObjectMapper reportObjectMapper = environment.getObjectMapper().copy()
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        final ReportConverterAppService reportConverterService = new ReportConverterAppService(
                featureDAO,
                scenarioDAO,
                reportConverter,
                reportObjectMapper
        );

        environment.jersey().register(new TestRunResource(testRunFactory, testRunDAO, testRunViewAccess, reportConverterService));
    }

    @Override
    public void uncaughtException(final Thread thread, final Throwable exception) {
        LOGGER.error("Caught exception on thread {}", thread, exception);
    }

}
