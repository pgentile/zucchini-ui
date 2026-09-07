package io.zucchiniui.backend.scenario.domain;

import dev.morphia.annotations.Entity;

import java.time.ZonedDateTime;

@Entity
public class ScenarioStatusChange extends ScenarioChange<ScenarioStatus> {

    /**
     * Private constructor for Morphia.
     */
    private ScenarioStatusChange() {
    }

    public ScenarioStatusChange(ZonedDateTime date, ScenarioStatus oldState, ScenarioStatus newState) {
        super(ChangeType.STATUS, date, oldState, newState);
    }

}
