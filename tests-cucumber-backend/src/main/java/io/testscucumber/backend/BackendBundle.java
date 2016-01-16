package io.testscucumber.backend;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.dropwizard.ConfiguredBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.testscucumber.backend.support.ddd.rest.EntityNotFoundExceptionMapper;
import io.testscucumber.backend.support.spring.SpringBundle;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;

public class BackendBundle implements ConfiguredBundle<BackendConfiguration> {

    @Override
    public void initialize(final Bootstrap<?> bootstrap) {
        final AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        applicationContext.register(BackendSpringConfig.class);
        bootstrap.addBundle(new SpringBundle(applicationContext));

        bootstrap.getObjectMapper()
            .registerModules(new JavaTimeModule(), new Jdk8Module())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    @Override
    public void run(final BackendConfiguration configuration, final Environment environment) throws Exception {
        final FilterRegistration.Dynamic crossOriginFilterRegistration = environment.servlets()
            .addFilter("cors-filter", CrossOriginFilter.class);
        crossOriginFilterRegistration.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
        crossOriginFilterRegistration.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,PUT,PATCH,DELETE");

        configuration.getMetrics().configure(environment.lifecycle(), environment.metrics());

        environment.jersey().register(new EntityNotFoundExceptionMapper());
    }

}
