package io.zucchiniui.backend;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.zucchiniui.backend.support.exceptionhandler.ExitExceptionHandler;

public class BackendApplication extends Application<BackendConfiguration> {

    public static void main(final String... args) throws Exception {
        final BackendApplication application = new BackendApplication();
        Thread.setDefaultUncaughtExceptionHandler(new ExitExceptionHandler());
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<BackendConfiguration> bootstrap) {
        bootstrap.addBundle(new BackendBundle());
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) throws Exception {

    }

}
