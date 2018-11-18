package io.zucchiniui.app;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.servlets.assets.AssetServlet;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.zucchiniui.backend.BackendBundle;
import io.zucchiniui.backend.support.exceptionhandler.ExitExceptionHandler;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletHolder;

import javax.servlet.DispatcherType;
import java.nio.charset.StandardCharsets;
import java.util.EnumSet;

public class ZucchiniUIApplication extends Application<ZucchiniUIConfiguration> {

    private static final String BASE_PATH = "/ui";

    public static void main(final String... args) throws Exception {
        final ZucchiniUIApplication application = new ZucchiniUIApplication();
        Thread.setDefaultUncaughtExceptionHandler(new ExitExceptionHandler());
        application.run(args);
    }

    @Override
    public void initialize(final Bootstrap<ZucchiniUIConfiguration> bootstrap) {
        bootstrap.addBundle(new BackendBundle());
        bootstrap.addBundle(new AssetsBundle("/ui", BASE_PATH, "index.html", "ui-assets"));
    }

    @Override
    public void run(final ZucchiniUIConfiguration configuration, final Environment environment) throws Exception {
        // Register the servlet that generates the UI Javascript config file
        final ServletHolder uiConfigServletHolder = new ServletHolder(new UIConfigServlet(configuration.getFrontend(), environment.getObjectMapper(), BASE_PATH));
        environment.getApplicationContext().addServlet(uiConfigServletHolder, BASE_PATH + "/assets/config.js");

        // Redirect to UI
        final ServletHolder redirectServletHolder = new ServletHolder(new RedirectServlet(BASE_PATH + "/"));
        environment.getApplicationContext().addServlet(redirectServletHolder, "");
        environment.getApplicationContext().addServlet(redirectServletHolder, BASE_PATH);

        // Forward 404 pages to index (used for browser history)
        final FilterHolder forwardFilterHolder = new FilterHolder(new ForwardToIndexFilter(BASE_PATH));
        environment.getApplicationContext().addFilter(forwardFilterHolder, BASE_PATH + "/*", EnumSet.allOf(DispatcherType.class));

        // Default servlet
        final ServletHolder defaultServletHolder = new ServletHolder(new AssetServlet("/favicons/", "/", null, StandardCharsets.UTF_8));
        environment.getApplicationContext().addServlet(defaultServletHolder, "/");
    }

}
