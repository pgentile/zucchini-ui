package example.support.morphia;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoClientURI;
import example.support.autocloseable.AutoCloseableManagedAdapter;
import io.dropwizard.setup.Environment;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import java.util.Optional;

public class MorphiaDatastoreBuilder {

    private final Environment environment;

    private String uri;

    private Optional<MongoClientOptions> options = Optional.empty();

    private Optional<Morphia> morphia = Optional.empty();

    private Optional<String> healthcheckName = Optional.empty();

    public MorphiaDatastoreBuilder(final Environment environment) {
        this.environment = environment;
    }

    public MorphiaDatastoreBuilder withUri(final String uri) {
        this.uri = uri;
        return this;
    }

    public MorphiaDatastoreBuilder withOptions(final MongoClientOptions.Builder optionsBuilder) {
        return withOptions(optionsBuilder.build());
    }

    public MorphiaDatastoreBuilder withOptions(final MongoClientOptions options) {
        this.options = Optional.of(options);
        return this;
    }

    public MorphiaDatastoreBuilder withMorphia(final Morphia morphia) {
        this.morphia = Optional.of(morphia);
        return this;
    }

    public MorphiaDatastoreBuilder withHealthcheckName(final String healthcheckName) {
        this.healthcheckName = Optional.of(healthcheckName);
        return this;
    }

    public Datastore build(final String name) {
        if (uri == null) {
            throw new IllegalStateException("URI is undefined");
        }

        // Init client options
        final MongoClientOptions activeOptions = options.orElseGet(() -> MongoClientOptions.builder().build());
        MongoClientOptions.Builder optionsBuilder = MongoClientOptions.builder(activeOptions);
        if (activeOptions.getDescription() == null) {
            optionsBuilder = optionsBuilder.description(name);
        }

        // Create client
        final MongoClientURI clientURI = new MongoClientURI(uri, optionsBuilder);
        final MongoClient mongoClient = new MongoClient(clientURI);
        environment.lifecycle().manage(new AutoCloseableManagedAdapter(mongoClient));

        // Create datastore
        final Morphia activeMorphia = morphia.orElseGet(this::createMorphia);
        final Datastore datastore = activeMorphia.createDatastore(mongoClient, clientURI.getDatabase());

        // Add healthcheck
        final DB db = datastore.getDB();
        final String activeHealthcheckName = healthcheckName.orElse(name);
        environment.healthChecks().register(activeHealthcheckName, new MongoHealthCheck(db));

        return datastore;
    }

    protected Morphia createMorphia() {
        final Morphia morphia = new Morphia();
        morphia.getMapper().getConverters().addConverter(ZonedDateTimeConverter.class);
        return morphia;
    }

}
