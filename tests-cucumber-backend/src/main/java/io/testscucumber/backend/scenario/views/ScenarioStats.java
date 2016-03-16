package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;

import java.util.EnumMap;
import java.util.Map;

public class ScenarioStats {

    private int count;

    private int reviewedCount;

    private int notReviewedCount;

    private final Map<ScenarioStatus, Integer> statsByStatus;

    private final Map<ScenarioStatus, Integer> reviewedStatsByStatus;

    private final Map<ScenarioStatus, Integer> notReviewedStatsByStatus;

    public ScenarioStats() {
        statsByStatus = new EnumMap<>(ScenarioStatus.class);
        reviewedStatsByStatus = new EnumMap<>(ScenarioStatus.class);
        notReviewedStatsByStatus = new EnumMap<>(ScenarioStatus.class);
        for (final ScenarioStatus status : ScenarioStatus.values()) {
            statsByStatus.put(status, 0);
            reviewedStatsByStatus.put(status, 0);
            notReviewedStatsByStatus.put(status, 0);
        }
    }

    public void addScenarioStatus(final ScenarioStatus status, final boolean reviewed) {
        statsByStatus.compute(status, (key, count) -> count + 1);
        count++;

        if (reviewed) {
            reviewedCount++;
            reviewedStatsByStatus.compute(status, (key, count) -> count + 1);
        } else {
            notReviewedCount++;
            notReviewedStatsByStatus.compute(status, (key, count) -> count + 1);
        }
    }

    public int getCount() {
        return count;
    }

    public int getReviewedCount() {
        return reviewedCount;
    }

    public int getNotReviewedCount() {
        return notReviewedCount;
    }

    public Map<ScenarioStatus, Integer> getStatsByStatus() {
        return statsByStatus;
    }

    public Map<ScenarioStatus, Integer> getReviewedStatsByStatus() {
        return reviewedStatsByStatus;
    }

    public Map<ScenarioStatus, Integer> getNotReviewedStatsByStatus() {
        return notReviewedStatsByStatus;
    }

    public FeatureStatus computeFeatureStatus() {
        if (count == 0) {
            return FeatureStatus.NOT_RUN;
        }
        if (statsByStatus.get(ScenarioStatus.FAILED) > 0) {
            return FeatureStatus.FAILED;
        }
        if (statsByStatus.get(ScenarioStatus.PASSED) == count) {
            return FeatureStatus.PASSED;
        }
        if (statsByStatus.get(ScenarioStatus.NOT_RUN) == count) {
            return FeatureStatus.NOT_RUN;
        }
        return FeatureStatus.PARTIAL;
    }

}
