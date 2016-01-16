package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.testrun.domain.TestRun;

public class ScenarioHistoryItemView {

    private String id;

    private ScenarioStatus status;

    private TestRun testRun;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public ScenarioStatus getStatus() {
        return status;
    }

    public void setStatus(final ScenarioStatus status) {
        this.status = status;
    }

    public TestRun getTestRun() {
        return testRun;
    }

    public void setTestRun(final TestRun testRun) {
        this.testRun = testRun;
    }

}
