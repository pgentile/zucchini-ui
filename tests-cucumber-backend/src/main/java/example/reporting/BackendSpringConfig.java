package example.reporting;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import example.support.morphia.MorphiaDatastoreBuilder;
import io.dropwizard.setup.Environment;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("example.reporting")
public class BackendSpringConfig {

    @Autowired
    private BackendConfiguration configuration;

    @Autowired
    private Environment dropwizardEnvironment;

    @Bean
    public Datastore datastore() {
        return new MorphiaDatastoreBuilder(dropwizardEnvironment)
                .withUri(configuration.getMongoUri())
                .build("mongo");
    }

    @Bean
    public ObjectMapper reportObjectMapper() {
        return dropwizardEnvironment.getObjectMapper()
                .copy()
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

}
