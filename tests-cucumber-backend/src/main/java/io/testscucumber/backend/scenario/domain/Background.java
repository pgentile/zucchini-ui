package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class Background {

    private BasicInfo info;

    private List<Step> steps = new ArrayList<>();

    /**
     * Private constructor for Morphia.
     */
    private Background() {

    }

    public Background copy() {
        final Background newBackground = new Background();
        newBackground.info = info;

        newBackground.steps = steps.stream()
            .map(Step::copy)
            .collect(Collectors.toList());

        return newBackground;
    }

    protected Background(final BackgroundBuilder builder) {
        info = Objects.requireNonNull(builder.getInfo());

        for (final StepBuilder stepBuilder : builder.getStepBuilders()) {
            steps.add(stepBuilder.build());
        }
    }

    public BasicInfo getInfo() {
        return info;
    }

    public List<Step> getSteps() {
        return Collections.unmodifiableList(steps);
    }

    protected void setStatus(final StepStatus newStatus) {
        for (final Step step : steps) {
            step.setStatus(newStatus);
        }
    }

}
