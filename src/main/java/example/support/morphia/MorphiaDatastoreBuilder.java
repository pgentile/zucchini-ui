package example.support.morphia;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import example.support.autocloseable.AutoCloseableManagedAdapter;
import io.dropwizard.setup.Environment;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

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

    public Datastore build(final String name) {
        if (uri == null) {
            throw new IllegalStateException("URI is undefined");
        }

        final Morphia morphia = new Morphia();

        final MongoClientURI clientURI = new MongoClientURI(uri);
        final MongoClient mongoClient = new MongoClient(clientURI);
        environment.lifecycle().manage(new AutoCloseableManagedAdapter(mongoClient));

        final Datastore datastore = morphia.createDatastore(mongoClient, clientURI.getDatabase());

        final DB db = datastore.getDB();
        environment.healthChecks().register(name, new MongoHealthCheck(db));

        return datastore;
    }

}
