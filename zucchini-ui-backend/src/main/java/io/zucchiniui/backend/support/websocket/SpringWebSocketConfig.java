package io.zucchiniui.backend.support.websocket;

import io.dropwizard.core.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.websocket.DeploymentException;
import jakarta.websocket.server.ServerContainer;
import jakarta.websocket.server.ServerEndpoint;
import jakarta.websocket.server.ServerEndpointConfig;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class SpringWebSocketConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpringWebSocketConfig.class);

    @Autowired
    private ConfigurableApplicationContext applicationContext;

    @Autowired
    private Environment dropwizardEnvironment;

    @PostConstruct
    public void registerEndpoints() {
        final Map<String, ServerEndpointConfig> endpointConfigs = createEndpointConfigs();

        // A servlet listener must be used to register endpoints. Otherwise, ServerContainer is not defined.
        dropwizardEnvironment.getApplicationContext().addEventListener(new ServletContextListener() {

            @Override
            public void contextInitialized(final ServletContextEvent servletContextEvent) {
                final ServerContainer serverContainer = (ServerContainer) servletContextEvent.getServletContext().getAttribute(ServerContainer.class.getName());
                if (serverContainer == null) {
                    throw new IllegalStateException("WebSocket ServerContainer doesn't exist");
                }

                registerEndpoints(serverContainer, endpointConfigs);
            }

            @Override
            public void contextDestroyed(final ServletContextEvent servletContextEvent) {

            }

        });
    }

    private Map<String, ServerEndpointConfig> createEndpointConfigs() {
        LOGGER.debug("Crating endpoint configs from Spring Beans");

        final List<String> beanNames = Arrays.asList(applicationContext.getBeanNamesForAnnotation(ServerEndpoint.class));

        final Map<String, ServerEndpointConfig> endpointConfigs = new HashMap<>(beanNames.size());

        beanNames.forEach(beanName -> {
            final Class<?> endpointClass = applicationContext.getType(beanName);
            final ServerEndpoint endpointAnnotation = applicationContext.findAnnotationOnBean(beanName, ServerEndpoint.class);

            LOGGER.debug("Creating endpoint config for bean {}", beanName);

            final ServerEndpointConfig endpointConfig = ServerEndpointConfig.Builder.create(endpointClass, endpointAnnotation.value())
                .configurator(new ServerEndpointConfig.Configurator() {

                    @Override
                    public <T> T getEndpointInstance(final Class<T> endpointClass) {
                        // Use Spring to create the endpoint instance
                        return endpointClass.cast(applicationContext.getBean(beanName));
                    }

                })
                .encoders(Arrays.asList(endpointAnnotation.encoders()))
                .decoders(Arrays.asList(endpointAnnotation.decoders()))
                .subprotocols(Arrays.asList(endpointAnnotation.subprotocols()))
                .build();

            endpointConfigs.put(beanName, endpointConfig);
        });

        return endpointConfigs;
    }

    private void registerEndpoints(final ServerContainer serverContainer, final Map<String, ServerEndpointConfig> endpointConfigs) {
        LOGGER.debug("Registering WebSockets endpoints");

        endpointConfigs.forEach((beanName, endpointConfig) -> {
            LOGGER.info("Registering endpoint bean {} to path {}", beanName, endpointConfig.getPath());
            try {
                serverContainer.addEndpoint(endpointConfig);
            } catch (final DeploymentException e) {
                throw new IllegalStateException("Can't register endpoints", e);
            }
        });
    }

}
