package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Step;
import io.zucchiniui.backend.shared.domain.Location;

import java.util.Set;

public class GroupedStepsListItemView {

    private Location stepDefinitionLocation;
    private Set<Step> occurrences;

    public void addOccurrence(Step step) {
        occurrences.add(step);
    }

    public Location getStepDefinitionLocation() {
        return stepDefinitionLocation;
    }

    public void setStepDefinitionLocation(Location stepDefinitionLocation) {
        this.stepDefinitionLocation = stepDefinitionLocation;
    }

    public Set<Step> getOccurrences() {
        return occurrences;
    }

    public void setOccurrences(Set<Step> occurrences) {
        this.occurrences = occurrences;
    }
}
