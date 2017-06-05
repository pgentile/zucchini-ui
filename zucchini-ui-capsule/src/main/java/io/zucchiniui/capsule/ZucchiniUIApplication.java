package io.zucchiniui.capsule;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.zucchiniui.backend.BackendBundle;
import io.zucchiniui.backend.BackendConfiguration;
import io.zucchiniui.backend.support.exceptionhandler.ExitExceptionHandler;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletHolder;

import javax.servlet.DispatcherType;
import java.util.EnumSet;

public class ZucchiniUIApplication extends Application<BackendConfiguration> {

    private static final String BASE_PATH = "/ui";

    public static void main(final String... args) throws Exception {
        final ZucchiniUIApplication application = new ZucchiniUIApplication();
        Thread.setDefaultUncaughtExceptionHandler(new ExitExceptionHandler());
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<BackendConfiguration> bootstrap) {
        bootstrap.addBundle(new BackendBundle());
        bootstrap.addBundle(new AssetsBundle("/ui", BASE_PATH, "index.html", "ui"));
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) throws Exception {
        // Register the servlet that generates the UI Javascript config file
        final ServletHolder uiConfigServletHolder = new ServletHolder(new UIConfigServlet(environment.getObjectMapper(), BASE_PATH));
        environment.getApplicationContext().addServlet(uiConfigServletHolder, BASE_PATH + "/assets/config.js");

        // Redirect to UI
        final ServletHolder redirectServletHolder = new ServletHolder(new RedirectServlet(BASE_PATH + "/"));
        environment.getApplicationContext().addServlet(redirectServletHolder, "/");
        environment.getApplicationContext().addServlet(redirectServletHolder, BASE_PATH);

        // Forward 404 pages to index (used for browser history)
        final FilterHolder forwardFilterHolder = new FilterHolder(new ForwardToIndexFilter(BASE_PATH));
        environment.getApplicationContext().addFilter(forwardFilterHolder, BASE_PATH + "/*", EnumSet.allOf(DispatcherType.class));
    }

}
