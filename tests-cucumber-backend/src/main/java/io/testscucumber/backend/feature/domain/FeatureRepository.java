package io.testscucumber.backend.feature.domain;

import io.testscucumber.backend.support.ddd.QueriableRepository;

public interface FeatureRepository extends QueriableRepository<Feature, String, FeatureQuery> {

}
