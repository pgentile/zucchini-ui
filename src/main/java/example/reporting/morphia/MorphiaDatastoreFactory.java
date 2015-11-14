package example.reporting.morphia;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.hibernate.validator.constraints.NotEmpty;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

public class MorphiaDatastoreFactory {

    @JsonIgnore
    private Datastore datastore;

    @NotEmpty
    private String uri;

    public Datastore build() {
        if (datastore == null) {
            final Morphia morphia = new Morphia();

            final MongoClientURI clientURI = new MongoClientURI(uri);
            final MongoClient mongoClient = new MongoClient(clientURI);

            datastore = morphia.createDatastore(mongoClient, clientURI.getDatabase());
        }

        return datastore;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(final String uri) {
        this.uri = uri;
    }

}
