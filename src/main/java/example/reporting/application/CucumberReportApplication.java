package example.reporting.application;

import com.fasterxml.jackson.databind.SerializationFeature;
import example.support.spring.SpringBundle;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.servlet.DispatcherType;
import java.util.EnumSet;

public class CucumberReportApplication extends Application<CucumberReportConfiguration> implements Thread.UncaughtExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(CucumberReportApplication.class);

    public static void main(final String... args) throws Exception {
        final CucumberReportApplication application = new CucumberReportApplication();
        Thread.setDefaultUncaughtExceptionHandler(application);
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<CucumberReportConfiguration> bootstrap) {
        bootstrap.addCommand(new ImportCommand(this));

        final AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        applicationContext.scan("example.reporting");
        bootstrap.addBundle(new SpringBundle<>(applicationContext));

        bootstrap.getObjectMapper()
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Override
    public void run(final CucumberReportConfiguration configuration, final Environment environment) throws Exception {
        environment.servlets()
                .addFilter("cors-filter", CrossOriginFilter.class)
                .addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
    }

    @Override
    public void uncaughtException(final Thread thread, final Throwable exception) {
        LOGGER.error("Caught exception on thread {}", thread, exception);

        System.err.println("System halted because of a fatal exception");
        exception.printStackTrace(System.err);
        System.exit(1);
    }

}
