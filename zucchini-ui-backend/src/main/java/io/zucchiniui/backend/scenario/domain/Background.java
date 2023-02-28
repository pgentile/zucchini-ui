package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Background {

    private BasicInfo info;

    private List<Step> steps = new ArrayList<>();

    /**
     * Private constructor for Morphia.
     */
    private Background() {

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

    protected Background copy() {
        final Background newBackground = new Background();
        newBackground.info = info;

        newBackground.steps = steps.stream()
            .map(Step::copy)
            .toList();

        return newBackground;
    }

    protected void setStatus(final StepStatus newStatus) {
        for (final Step step : steps) {
            step.setStatus(newStatus);
        }
    }

}
