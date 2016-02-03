package io.testscucumber.backend.feature.domainimpl;

import io.testscucumber.backend.feature.dao.FeatureDAO;
import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class FeatureRepositoryImpl extends MorphiaQueriableRepository<Feature, String, FeatureQuery> implements FeatureRepository {

    private final FeatureDAO dao;

    @Autowired
    public FeatureRepositoryImpl(final FeatureDAO dao) {
        super(dao);
        this.dao = dao;
    }

    @Override
    public void deleteByTestRunId(final String testRunId) {
        final Query<Feature> query = dao.prepareTypedQuery(q -> q.withTestRunId(testRunId));
        dao.deleteByQuery(query);
    }

}
