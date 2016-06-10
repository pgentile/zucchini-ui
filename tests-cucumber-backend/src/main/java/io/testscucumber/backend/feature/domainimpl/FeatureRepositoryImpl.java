package io.testscucumber.backend.feature.domainimpl;

import io.testscucumber.backend.feature.dao.FeatureDAO;
import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.stereotype.Component;

@Component
class FeatureRepositoryImpl extends MorphiaQueriableRepository<Feature, String, FeatureQuery> implements FeatureRepository {

    public FeatureRepositoryImpl(final FeatureDAO dao) {
        super(dao);
    }

}
