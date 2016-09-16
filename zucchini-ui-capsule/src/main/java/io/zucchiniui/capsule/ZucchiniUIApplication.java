package io.zucchiniui.capsule;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.zucchiniui.backend.BackendBundle;
import io.zucchiniui.backend.BackendConfiguration;
import io.zucchiniui.backend.support.exceptionhandler.ExitExceptionHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class ZucchiniUIApplication extends Application<BackendConfiguration> {

    public static void main(final String... args) throws Exception {
        final ZucchiniUIApplication application = new ZucchiniUIApplication();
        Thread.setDefaultUncaughtExceptionHandler(new ExitExceptionHandler());
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<BackendConfiguration> bootstrap) {
        bootstrap.addBundle(new BackendBundle());
        bootstrap.addBundle(new AssetsBundle("/ui", "/ui", "index.html", "ui"));
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) throws Exception {
        // Register the servlet that generates the UI Javascript config file
        final ServletHolder uiConfigServletHolder = new ServletHolder(new UIConfigServlet(environment.getObjectMapper()));
        environment.getApplicationContext().addServlet(uiConfigServletHolder, "/ui/config.js");

        // Redirect to UI
        final ServletHolder redirectServletHolder = new ServletHolder(new RedirectServlet("/ui/"));
        environment.getApplicationContext().addServlet(redirectServletHolder, "/");
        environment.getApplicationContext().addServlet(redirectServletHolder, "/ui");
    }

}
