package io.zucchiniui.backend.support.websocket;

import io.dropwizard.core.Configuration;
import io.dropwizard.core.ConfiguredBundle;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import org.eclipse.jetty.websocket.jakarta.server.config.JakartaWebSocketServletContainerInitializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;

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

                JakartaWebSocketServletContainerInitializer.configure(environment.getApplicationContext(), null);
            }

            @Override
            public void contextDestroyed(final ServletContextEvent servletContextEvent) {
                // Nothing to do
            }

        });
    }

}
