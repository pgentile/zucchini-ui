package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.feature.domain.FeatureStatus;

public record ScenarioTagStats(String tag, ScenarioStats stats) {

    public FeatureStatus getStatus() {
        return stats.computeFeatureStatus();
    }

}
