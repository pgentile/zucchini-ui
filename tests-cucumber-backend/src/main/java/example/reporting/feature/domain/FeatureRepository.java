package example.reporting.feature.domain;

import example.support.ddd.QueriableRepository;

public interface FeatureRepository extends QueriableRepository<Feature, String, FeatureQuery> {
}
