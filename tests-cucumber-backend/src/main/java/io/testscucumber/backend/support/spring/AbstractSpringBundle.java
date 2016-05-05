package io.testscucumber.backend.support.spring;

import io.dropwizard.Configuration;
import io.dropwizard.ConfiguredBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;

import javax.ws.rs.Path;

public abstract class AbstractSpringBundle implements ConfiguredBundle<Configuration> {

    private static final Logger LOGGER = LoggerFactory.getLogger(AbstractSpringBundle.class);

    @Override
    public void run(final Configuration configuration, final Environment environment) throws Exception {
        final ConfigurableApplicationContext applicationContext = createApplicationContext();
        if (applicationContext.isActive()) {
            throw new IllegalStateException("Spring context already started");
        }

        environment.lifecycle().manage(new SpringContextManaged(applicationContext));

        applicationContext.getBeanFactory().registerSingleton("dropwizardConfig", configuration);
        applicationContext.getBeanFactory().registerSingleton("dropwizardEnv", environment);
        applicationContext.refresh();

        applicationContext.getBeansWithAnnotation(Path.class).forEach((name, resource) -> {
            LOGGER.info("Registring resource {}", name);
            environment.jersey().register(resource);
        });
    }

    @Override
    public void initialize(final Bootstrap<?> bootstrap) {

    }

    protected abstract ConfigurableApplicationContext createApplicationContext();

}
