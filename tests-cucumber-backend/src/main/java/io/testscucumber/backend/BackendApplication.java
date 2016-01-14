package io.testscucumber.backend;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BackendApplication extends Application<BackendConfiguration> implements Thread.UncaughtExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(BackendApplication.class);

    public static void main(final String... args) throws Exception {
        final BackendApplication application = new BackendApplication();
        Thread.setDefaultUncaughtExceptionHandler(application);
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<BackendConfiguration> bootstrap) {
        bootstrap.addBundle(new BackendBundle());
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) throws Exception {

    }

    @Override
    public void uncaughtException(final Thread thread, final Throwable exception) {
        LOGGER.error("Caught exception on thread {}", thread, exception);

        System.err.println("System halted because of a fatal exception");
        exception.printStackTrace(System.err);
        System.exit(1);
    }

}
