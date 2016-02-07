package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;

import java.util.ArrayList;
import java.util.List;

public class Background {

    private BasicInfo info;

    private final List<Step> steps = new ArrayList<>();

    /**
     * Private constructor for Morphia.
     */
    private Background() {

    }

    protected Background(final BackgroundBuilder builder) {
        info = builder.getInfo();

        for (final StepBuilder stepBuilder : builder.getStepBuilders()) {
            steps.add(stepBuilder.build());
        }
    }

    public BasicInfo getInfo() {
        return info;
    }

    public List<Step> getSteps() {
        return steps;
    }

    protected void setStatus(final StepStatus newStatus) {
        for (final Step step : steps) {
            step.setStatus(newStatus);
        }
    }
}
