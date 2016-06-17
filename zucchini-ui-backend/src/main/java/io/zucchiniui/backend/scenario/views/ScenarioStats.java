package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.feature.domain.FeatureStatus;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;

public class ScenarioStats {

    private final TypedScenarioStats all = new TypedScenarioStats();

    private final TypedScenarioStats reviewed = new TypedScenarioStats();

    private final TypedScenarioStats nonReviewed = new TypedScenarioStats();

    public void addScenarioStatus(final ScenarioStatus status, final boolean reviewedState) {
        all.addScenarioStatus(status);

        if (reviewedState) {
            reviewed.addScenarioStatus(status);
        } else {
            nonReviewed.addScenarioStatus(status);
        }
    }

    public TypedScenarioStats getAll() {
        return all;
    }

    public TypedScenarioStats getReviewed() {
        return reviewed;
    }

    public TypedScenarioStats getNonReviewed() {
        return nonReviewed;
    }

    public FeatureStatus computeFeatureStatus() {
        if (all.getCount() == 0) {
            return FeatureStatus.NOT_RUN;
        }
        if (all.getFailed() > 0) {
            return FeatureStatus.FAILED;
        }
        if (all.getPassed() == all.getCount()) {
            return FeatureStatus.PASSED;
        }
        if (all.getNotRun() == all.getCount()) {
            return FeatureStatus.NOT_RUN;
        }
        return FeatureStatus.PARTIAL;
    }

}
