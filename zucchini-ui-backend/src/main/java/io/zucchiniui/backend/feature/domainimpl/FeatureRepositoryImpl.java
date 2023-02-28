package io.zucchiniui.backend.feature.domainimpl;

import io.zucchiniui.backend.feature.dao.FeatureDAO;
import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureQuery;
import io.zucchiniui.backend.feature.domain.FeatureRepository;
import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaRepository;
import org.springframework.stereotype.Component;

@Component
class FeatureRepositoryImpl extends MorphiaRepository<Feature, String, FeatureDAO> implements FeatureRepository {

    public FeatureRepositoryImpl(final FeatureDAO dao) {
        super(dao);
    }

    @Override
    public PreparedQuery<Feature> query(FeatureQuery q) {
        return prepareQuery(dao -> dao.query(q));
    }

}
