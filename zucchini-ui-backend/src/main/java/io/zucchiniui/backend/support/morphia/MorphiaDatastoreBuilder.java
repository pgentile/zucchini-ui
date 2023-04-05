package io.zucchiniui.backend.support.morphia;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoClientURI;
import io.dropwizard.core.setup.Environment;
import io.zucchiniui.backend.support.autocloseable.AutoCloseableManagedAdapter;
import xyz.morphia.Datastore;
import xyz.morphia.Morphia;
import xyz.morphia.logging.MorphiaLoggerFactory;
import xyz.morphia.logging.slf4j.SLF4JLoggerImplFactory;

public class MorphiaDatastoreBuilder {

    static {
        MorphiaLoggerFactory.registerLogger(SLF4JLoggerImplFactory.class);
    }

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

        // Init client options
        final MongoClientOptions.Builder optionBuilder = MongoClientOptions.builder().applicationName(applicationName);

        // Create client
        final MongoClientURI clientURI = new MongoClientURI(uri, optionBuilder);
        final MongoClient mongoClient = new MongoClient(clientURI);
        environment.lifecycle().manage(new AutoCloseableManagedAdapter(mongoClient));

        // Create datastore
        final Morphia morphia = createMorphia();
        final Datastore datastore = morphia.createDatastore(mongoClient, clientURI.getDatabase());

        // Add healthcheck
        final DB db = datastore.getDB();
        environment.healthChecks().register(name, new MongoHealthCheck(db));

        return datastore;
    }

    private Morphia createMorphia() {
        final Morphia morphia = new Morphia();
        morphia.getMapper().getConverters().addConverter(ZonedDateTimeConverter.class);
        return morphia;
    }

}
