package example.reporting.services;

import example.reporting.model.Feature;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;

public class FeatureDAO extends BasicDAO<Feature, String> {

    public FeatureDAO(final Datastore ds) {
        super(ds);
    }

}
