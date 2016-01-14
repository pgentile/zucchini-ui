package io.testscucumber.backend.feature.domainimpl;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class FeatureDAO extends MorphiaTypedQueryDAO<Feature, String, FeatureQueryImpl> {

    @Autowired
    public FeatureDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    protected FeatureQueryImpl createTypedQuery() {
        return new FeatureQueryImpl(createQuery());
    }

}
