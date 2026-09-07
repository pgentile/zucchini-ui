package io.zucchiniui.backend.scenario.domain;

import dev.morphia.annotations.Entity;

import java.time.ZonedDateTime;

@Entity
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
