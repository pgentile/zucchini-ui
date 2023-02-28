package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.ScenarioStatus;

public class TypedScenarioStats {

    private int count;

    private int notRun;

    private int passed;

    private int failed;

    private int pending;

    public void addScenarioStatus(final ScenarioStatus status) {
        count++;

        switch (status) {
            case NOT_RUN -> notRun++;
            case PASSED -> passed++;
            case FAILED -> failed++;
            case PENDING -> pending++;
        }
    }

    public int getCount() {
        return count;
    }

    public int getNotRun() {
        return notRun;
    }

    public int getPassed() {
        return passed;
    }

    public int getFailed() {
        return failed;
    }

    public int getPending() {
        return pending;
    }
}
