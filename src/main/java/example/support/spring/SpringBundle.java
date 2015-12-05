package example.support.spring;

import io.dropwizard.Configuration;
import io.dropwizard.ConfiguredBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ConfigurableApplicationContext;

import javax.ws.rs.Path;

public class SpringBundle<T extends Configuration> implements ConfiguredBundle<T> {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpringBundle.class);

    private final ConfigurableApplicationContext applicationContext;

    public SpringBundle(ConfigurableApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void run(T configuration, Environment environment) throws Exception {
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
    public void initialize(Bootstrap<?> bootstrap) {

    }

}
