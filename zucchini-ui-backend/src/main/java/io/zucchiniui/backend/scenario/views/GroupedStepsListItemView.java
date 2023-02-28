package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Step;

import java.util.Set;

public class GroupedStepsListItemView {

    private String definitionSource;
    private Set<StepOccurrence> occurrences;

    public void addOccurrence(Step step) {
        occurrences.add(new StepOccurrence(step.getInfo(), step.getStatus()));
    }

    public String getDefinitionSource() {
        return definitionSource;
    }

    public void setDefinitionSource(String definitionSource) {
        this.definitionSource = definitionSource;
    }

    public Set<StepOccurrence> getOccurrences() {
        return occurrences;
    }

    public void setOccurrences(Set<StepOccurrence> occurrences) {
        this.occurrences = occurrences;
    }
}
