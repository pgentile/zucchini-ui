package io.zucchiniui.backend.feature.domain;

import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.Repository;

public interface FeatureRepository extends Repository<Feature, String> {

    PreparedQuery<Feature> query(FeatureQuery q);

}
