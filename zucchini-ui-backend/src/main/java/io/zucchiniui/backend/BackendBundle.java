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
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import jakarta.servlet.DispatcherType;
import jakarta.servlet.FilterRegistration;
import java.util.EnumSet;

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
            .setSerializationInclusion(JsonInclude.Include.NON_NULL);

        // Enable WebSockets for Jetty
        bootstrap.addBundle(new WebSocketEnablerBundle());

        // Register Spring context
        applicationContext.register(BackendSpringConfig.class);
        bootstrap.addBundle(new SpringBundle(applicationContext));
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) {
        final FilterRegistration.Dynamic crossOriginFilterRegistration = environment.servlets()
            .addFilter("cors-filter", CrossOriginFilter.class);
        crossOriginFilterRegistration.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
        crossOriginFilterRegistration.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,PUT,PATCH,DELETE");

        configuration.getMetrics().configure(environment.lifecycle(), environment.metrics());

        final JerseyEnvironment jerseyEnvironment = environment.jersey();
        jerseyEnvironment.register(new EntityNotFoundExceptionMapper());
        jerseyEnvironment.register(new ConcurrentEntityModificationExceptionMapper());
    }

}
