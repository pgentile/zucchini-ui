package io.zucchiniui.backend.support.websocket;

import io.dropwizard.Configuration;
import io.dropwizard.ConfiguredBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;

public class WebSocketEnablerBundle implements ConfiguredBundle<Configuration> {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketEnablerBundle.class);

    @Override
    public void initialize(final Bootstrap<?> bootstrap) {

    }

    @Override
    public void run(final Configuration config, final Environment environment) {
        environment.servlets().addServletListeners(new ServletContextListener() {

            @Override
            public void contextInitialized(final ServletContextEvent servletContextEvent) {
                LOGGER.info("Configuring WebSocket container");

                try {
                    WebSocketServerContainerInitializer.initialize(environment.getApplicationContext());
                } catch (final ServletException e) {
                    throw new RuntimeException("Can't enable WebSocket feature for Jetty", e);
                }
            }

            @Override
            public void contextDestroyed(final ServletContextEvent servletContextEvent) {
                // Nothing to do
            }

        });
    }

}
