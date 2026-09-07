package io.zucchiniui.backend;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.core.ConfiguredBundle;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.jersey.setup.JerseyEnvironment;
import io.zucchiniui.backend.support.ddd.rest.ConcurrentEntityModificationExceptionMapper;
import io.zucchiniui.backend.support.ddd.rest.EntityNotFoundExceptionMapper;
import io.zucchiniui.backend.support.spring.SpringBundle;
import io.zucchiniui.backend.support.websocket.WebSocketEnablerBundle;
import org.eclipse.jetty.server.handler.CrossOriginHandler;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.Set;

public class BackendBundle implements ConfiguredBundle<BackendConfiguration> {

    private final AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();

    @Override
    public void initialize(final Bootstrap<?> bootstrap) {
        // Enable variable substitution with environment variables
        bootstrap.setConfigurationSourceProvider(new SubstitutingSourceProvider(
            bootstrap.getConfigurationSourceProvider(),
            new EnvironmentVariableSubstitutor(false)
        ));

        // Configure Jackson mapper
        bootstrap.getObjectMapper()
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .setDefaultPropertyInclusion(JsonInclude.Include.NON_NULL);

        // Enable WebSockets for Jetty
        bootstrap.addBundle(new WebSocketEnablerBundle());

        // Register Spring context
        applicationContext.register(BackendSpringConfig.class);
        bootstrap.addBundle(new SpringBundle(applicationContext));
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) {
        final CrossOriginHandler crossOriginHandler = new CrossOriginHandler();
        crossOriginHandler.setAllowedOriginPatterns(Set.of("*"));
        crossOriginHandler.setAllowedMethods(Set.of("GET", "POST", "PUT", "PATCH", "DELETE"));
        crossOriginHandler.setAllowedHeaders(Set.of("X-Requested-With", "Content-Type", "Accept", "Origin"));
        environment.getApplicationContext().insertHandler(crossOriginHandler);

        configuration.getMetrics().configure(environment.lifecycle(), environment.metrics());

        final JerseyEnvironment jerseyEnvironment = environment.jersey();
        jerseyEnvironment.register(new EntityNotFoundExceptionMapper());
        jerseyEnvironment.register(new ConcurrentEntityModificationExceptionMapper());
    }

}
