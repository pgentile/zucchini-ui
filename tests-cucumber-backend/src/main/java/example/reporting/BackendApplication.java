package example.reporting;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import example.support.spring.SpringBundle;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;

public class BackendApplication extends Application<BackendConfiguration> implements Thread.UncaughtExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(BackendApplication.class);

    public static void main(final String... args) throws Exception {
        final BackendApplication application = new BackendApplication();
        Thread.setDefaultUncaughtExceptionHandler(application);
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<BackendConfiguration> bootstrap) {
        final AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        applicationContext.register(BackendSpringConfig.class);
        bootstrap.addBundle(new SpringBundle(applicationContext));

        bootstrap.getObjectMapper()
            .registerModules(new JavaTimeModule(), new Jdk8Module())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) throws Exception {
        final FilterRegistration.Dynamic crossOriginFilterRegistration = environment.servlets()
            .addFilter("cors-filter", CrossOriginFilter.class);
        crossOriginFilterRegistration.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
        crossOriginFilterRegistration.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,PUT,PATCH,DELETE");

        configuration.getMetrics().configure(environment.lifecycle(), environment.metrics());
    }

    @Override
    public void uncaughtException(final Thread thread, final Throwable exception) {
        LOGGER.error("Caught exception on thread {}", thread, exception);

        System.err.println("System halted because of a fatal exception");
        exception.printStackTrace(System.err);
        System.exit(1);
    }

}
