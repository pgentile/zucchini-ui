package io.zucchiniui.backend.feature.domain;

import io.zucchiniui.backend.support.ddd.QueriableRepository;

public interface FeatureRepository extends QueriableRepository<Feature, String, FeatureQuery> {

}
