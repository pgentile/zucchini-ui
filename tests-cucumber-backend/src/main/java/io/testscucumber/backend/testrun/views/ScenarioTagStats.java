package io.testscucumber.backend.testrun.views;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.scenario.views.ScenarioStats;

public class ScenarioTagStats {

    private final String tag;

    private final ScenarioStats stats;

    @JsonCreator
    public ScenarioTagStats(@JsonProperty("tag") final String tag, @JsonProperty("stats") final ScenarioStats stats) {
        this.tag = tag;
        this.stats = stats;
    }

    public String getTag() {
        return tag;
    }

    public ScenarioStats getStats() {
        return stats;
    }

    public FeatureStatus getStatus() {
        if (stats.getCount() == 0) {
            return FeatureStatus.NOT_RUN;
        }
        if (stats.getStatsByStatus().get(ScenarioStatus.FAILED) > 0) {
            return FeatureStatus.FAILED;
        }
        if (stats.getStatsByStatus().get(ScenarioStatus.PASSED) == stats.getCount()) {
            return FeatureStatus.PASSED;
        }
        if (stats.getStatsByStatus().get(ScenarioStatus.NOT_RUN) == stats.getCount()) {
            return FeatureStatus.NOT_RUN;
        }
        return FeatureStatus.PARTIAL;
    }

}
