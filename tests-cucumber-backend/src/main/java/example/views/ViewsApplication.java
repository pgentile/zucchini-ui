package example.views;

import com.fasterxml.jackson.databind.SerializationFeature;
import io.dropwizard.Application;
import io.dropwizard.Configuration;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ViewsApplication extends Application<Configuration> implements Thread.UncaughtExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ViewsApplication.class);

    public static void main(final String... args) throws Exception {
        final ViewsApplication application = new ViewsApplication();
        Thread.setDefaultUncaughtExceptionHandler(application);
        application.run(args);
    }

    @Override
    public void initialize(Bootstrap<Configuration> bootstrap) {
        bootstrap.getObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    }

    @Override
    public void run(Configuration configuration, Environment environment) throws Exception {
        environment.jersey().register(new ViewResource(environment.lifecycle().executorService("async-%d").build()));
        environment.jersey().register(new ViewKindFilter());
    }

    @Override
    public void uncaughtException(final Thread thread, final Throwable exception) {
        LOGGER.error("Caught exception on thread {}", thread, exception);

        System.err.println("System halted because of a fatal exception");
        exception.printStackTrace(System.err);
        System.exit(1);
    }

}
