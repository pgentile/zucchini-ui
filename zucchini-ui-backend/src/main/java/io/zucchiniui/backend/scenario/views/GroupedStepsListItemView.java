package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Step;
import io.zucchiniui.backend.shared.domain.Location;

import java.util.Set;

public class GroupedStepsListItemView {

    private Location stepDefinitionLocation;
    private Set<StepOccurrence> occurrences;

    void addOccurrence(Step step) {
        occurrences.add(new StepOccurrence(step.getInfo(), step.getStatus()));
    }

    Location getStepDefinitionLocation() {
        return stepDefinitionLocation;
    }

    void setStepDefinitionLocation(Location stepDefinitionLocation) {
        this.stepDefinitionLocation = stepDefinitionLocation;
    }

    Set<StepOccurrence> getOccurrences() {
        return occurrences;
    }

    void setOccurrences(Set<StepOccurrence> occurrences) {
        this.occurrences = occurrences;
    }
}
