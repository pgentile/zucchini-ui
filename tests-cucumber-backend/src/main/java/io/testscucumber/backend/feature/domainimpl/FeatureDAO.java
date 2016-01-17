package io.testscucumber.backend.feature.domainimpl;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class FeatureDAO extends MorphiaTypedQueryDAO<Feature, String, FeatureQuery> {

    @Autowired
    public FeatureDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public Query<Feature> prepareTypedQuery(final Consumer<? super FeatureQuery> preparator) {
        final FeatureQueryImpl typedQuery = new FeatureQueryImpl(createQuery());
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
