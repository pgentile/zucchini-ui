package io.testscucumber.backend.testrun.views;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.testscucumber.backend.scenario.views.ScenarioStats;

public class ScenarioTagStats {

    private final String tag;

    private final ScenarioStats stats;

    @JsonCreator
    public ScenarioTagStats(@JsonProperty("tag") String tag, @JsonProperty("stats") ScenarioStats stats) {
        this.tag = tag;
        this.stats = stats;
    }

    public String getTag() {
        return tag;
    }

    public ScenarioStats getStats() {
        return stats;
    }

}
