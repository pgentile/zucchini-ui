package example.reporting.feature.domainimpl;

import example.reporting.feature.domain.Feature;
import example.support.morphiaddd.AbstractMorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class FeatureDAO extends AbstractMorphiaTypedQueryDAO<Feature, String, FeatureQueryImpl> {

    @Autowired
    public FeatureDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public FeatureQueryImpl createTypedQuery() {
        return new FeatureQueryImpl(createQuery());
    }

}
