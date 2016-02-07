package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class BackgroundBuilder {

    private BasicInfo info;

    private final List<StepBuilder> stepBuilders = new ArrayList<>();

    public Background build() {
        return new Background(this);
    }

    public BackgroundBuilder withInfo(final BasicInfo info) {
        this.info = info;
        return this;
    }

    public BackgroundBuilder addStep(final Consumer<StepBuilder> stepBuilderConsumer) {
        final StepBuilder stepBuilder = new StepBuilder();
        stepBuilderConsumer.accept(stepBuilder);
        stepBuilders.add(stepBuilder);
        return this;
    }

    protected BasicInfo getInfo() {
        return info;
    }

    protected List<StepBuilder> getStepBuilders() {
        return stepBuilders;
    }

}
