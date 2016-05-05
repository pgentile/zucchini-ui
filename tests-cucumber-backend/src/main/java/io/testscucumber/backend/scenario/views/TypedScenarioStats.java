package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.domain.ScenarioStatus;

public class TypedScenarioStats {

    private int count;

    private int notRun;

    private int passed;

    private int failed;

    private int pending;

    public void addScenarioStatus(final ScenarioStatus status) {
        count++;

        switch (status) {
            case NOT_RUN:
                notRun++;
                break;
            case PASSED:
                passed++;
                break;
            case FAILED:
                failed++;
                break;
            case PENDING:
                pending++;
                break;
            default:
                throw new IllegalArgumentException("Unknown status: " + status);
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
