package io.zucchiniui.backend.feature.domain;

import java.util.Collection;

public interface FeatureQuery {

    FeatureQuery withFeatureKey(String featureKey);

    FeatureQuery withTestRunId(String testRunId);

    FeatureQuery withIdIn(Collection<String> ids);

    FeatureQuery orderByGroupAndName();

}
