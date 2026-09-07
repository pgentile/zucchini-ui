package io.zucchiniui.backend.support.morphia;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import dev.morphia.Datastore;
import dev.morphia.Morphia;
import dev.morphia.config.MorphiaConfig;
import io.dropwizard.core.setup.Environment;
import io.zucchiniui.backend.support.autocloseable.AutoCloseableManagedAdapter;

public class MorphiaDatastoreBuilder {

    private final Environment environment;

    private String uri;

    public MorphiaDatastoreBuilder(final Environment environment) {
        this.environment = environment;
    }

    public MorphiaDatastoreBuilder withUri(final String uri) {
        this.uri = uri;
        return this;
    }

    public Datastore build(final String name, final String applicationName) {
        if (uri == null) {
            throw new IllegalStateException("URI is undefined");
        }

        // Init client
        final ConnectionString connectionString = new ConnectionString(uri);
        final MongoClientSettings clientSettings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .applicationName(applicationName)
            .build();
        final MongoClient mongoClient = MongoClients.create(clientSettings);
        environment.lifecycle().manage(new AutoCloseableManagedAdapter(mongoClient));

        // Create datastore
        final String databaseName = connectionString.getDatabase();
        if (databaseName == null) {
            throw new IllegalStateException("Database name is undefined in Mongo URI");
        }

        final MorphiaConfig config = MorphiaConfig.load()
            .database(databaseName)
            .packages(java.util.List.of("io.zucchiniui.backend"))
            .codecProvider(new DateTimeCodecProvider());

        final Datastore datastore = Morphia.createDatastore(mongoClient, config);

        // Add healthcheck
        environment.healthChecks().register(name, new MongoHealthCheck(datastore.getDatabase()));

        return datastore;
    }

}
