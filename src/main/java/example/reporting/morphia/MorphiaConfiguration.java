package example.reporting.morphia;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface MorphiaConfiguration {

    @JsonProperty("morphiaDatastore")
    MorphiaDatastoreFactory getMorphiaDatastoreFactory();

    @JsonProperty("morphiaDatastore")
    void setMorphiaDatastoreFactory(MorphiaDatastoreFactory morphiaDatastoreFactory);

}
