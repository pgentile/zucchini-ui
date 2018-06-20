package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Step;
import io.zucchiniui.backend.shared.domain.Location;

import java.util.Set;

public class GroupedStepsListItemView {

    private Location stepDefinitionLocation;
    private Set<StepOccurrence> occurrences;

    public void addOccurrence(Step step) {
        occurrences.add(new StepOccurrence(step.getInfo(), step.getStatus()));
    }

    public Location getStepDefinitionLocation() {
        return stepDefinitionLocation;
    }

    public void setStepDefinitionLocation(Location stepDefinitionLocation) {
        this.stepDefinitionLocation = stepDefinitionLocation;
    }

    public Set<StepOccurrence> getOccurrences() {
        return occurrences;
    }

    public void setOccurrences(Set<StepOccurrence> occurrences) {
        this.occurrences = occurrences;
    }
}
