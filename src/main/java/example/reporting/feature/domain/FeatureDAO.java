package example.reporting.feature.domain;

import example.reporting.feature.model.Feature;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;

public class FeatureDAO extends BasicDAO<Feature, String> {

    public FeatureDAO(final Datastore ds) {
        super(ds);
    }

}
