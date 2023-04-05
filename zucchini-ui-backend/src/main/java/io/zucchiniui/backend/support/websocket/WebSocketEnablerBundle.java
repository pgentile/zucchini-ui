package io.zucchiniui.backend.support.websocket;

import io.dropwizard.core.Configuration;
import io.dropwizard.core.ConfiguredBundle;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import org.eclipse.jetty.websocket.jakarta.server.config.JakartaWebSocketServletContainerInitializer;

public class WebSocketEnablerBundle implements ConfiguredBundle<Configuration> {

    @Override
    public void initialize(final Bootstrap<?> bootstrap) {

    }

    @Override
    public void run(final Configuration config, final Environment environment) {
        JakartaWebSocketServletContainerInitializer.configure(environment.getApplicationContext(), null);
    }

}
