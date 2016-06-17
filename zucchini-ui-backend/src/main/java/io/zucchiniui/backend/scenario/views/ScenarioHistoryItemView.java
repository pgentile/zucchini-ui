package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import io.zucchiniui.backend.testrun.domain.TestRun;

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
