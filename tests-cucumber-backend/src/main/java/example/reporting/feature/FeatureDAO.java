package example.reporting.feature;

import example.reporting.api.feature.Feature;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FeatureDAO extends BasicDAO<Feature, String> {

    @Autowired
    public FeatureDAO(final Datastore ds) {
        super(ds);
    }

}
