package io.zucchiniui.backend.scenario.domain;

import java.time.ZonedDateTime;

public class ScenarioReviewedStateChange extends ScenarioChange<Boolean> {

    /**
     * Private constructor for Morphia.
     */
    private ScenarioReviewedStateChange() {
    }

    public ScenarioReviewedStateChange(ZonedDateTime date, boolean oldState, boolean newState) {
        super(ChangeType.REVIEWED_STATE, date, oldState, newState);
    }

}
