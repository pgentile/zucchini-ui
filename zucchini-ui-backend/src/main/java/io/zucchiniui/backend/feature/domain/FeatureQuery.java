package io.zucchiniui.backend.feature.domain;

import java.util.Collection;

public record FeatureQuery(
    String featureKey,
    String testRunId,
    Collection<String> ids,
    boolean orderByGroupAndName
) {

    public FeatureQuery() {
        this(null, null, null, false);
    }

    public FeatureQuery withFeatureKey(String featureKey) {
        return new FeatureQuery(featureKey, testRunId, ids, orderByGroupAndName);
    }

    public FeatureQuery withTestRunId(String testRunId) {
        return new FeatureQuery(featureKey, testRunId, ids, orderByGroupAndName);

    }

    public FeatureQuery withIdIn(Collection<String> ids) {
        return new FeatureQuery(featureKey, testRunId, ids, orderByGroupAndName);
    }

    public FeatureQuery sortByGroupAndName() {
        return new FeatureQuery(featureKey, testRunId, ids, true);
    }

}
