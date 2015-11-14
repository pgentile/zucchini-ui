package example.reporting.morphia;

import io.dropwizard.ConfiguredBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.mongodb.morphia.Datastore;

public class MorphiaBundle implements ConfiguredBundle<MorphiaConfiguration> {

    @Override
    public void run(final MorphiaConfiguration configuration, final Environment environment) throws Exception {
        final Datastore datastore = configuration.getMorphiaDatastoreFactory().build();
        environment.lifecycle().manage(new AutoCloseableManaged(datastore.getMongo()));
        environment.healthChecks().register("mongo-morphia", new MongoHealthCheck(datastore.getDB()));
    }

    @Override
    public void initialize(final Bootstrap<?> bootstrap) {

    }

}
