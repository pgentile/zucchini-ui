package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;

public class ScenarioBuilder {

    private String scenarioKey;

    private String featureId;

    private String testRunId;

    private String language;

    private Set<String> tags = new HashSet<>();

    private Set<String> extraTags = new HashSet<>();

    private BackgroundBuilder backgroundBuilder;

    private List<String> errorOutputCodes = new ArrayList<>();

    private BasicInfo info;

    private String comment;

    private final List<StepBuilder> stepBuilders = new ArrayList<>();

    private final List<AroundActionBuilder> beforeActionBuilders = new ArrayList<>();

    private final List<AroundActionBuilder> afterActionBuilders = new ArrayList<>();

    public Scenario build() {
        return new Scenario(this);
    }

    public ScenarioBuilder withScenarioKey(final String scenarioKey) {
        this.scenarioKey = scenarioKey;
        return this;
    }

    public ScenarioBuilder withFeatureId(final String featureId) {
        this.featureId = featureId;
        return this;
    }

    public ScenarioBuilder withTestRunId(final String testRunId) {
        this.testRunId = testRunId;
        return this;
    }

    public ScenarioBuilder withLanguage(String language) {
        this.language = language;
        return this;
    }

    public ScenarioBuilder withTags(final Set<String> tags) {
        this.tags = tags;
        return this;
    }

    public ScenarioBuilder withExtraTags(final Set<String> extraTags) {
        this.extraTags = extraTags;
        return this;
    }

    public ScenarioBuilder withErrorOutputCodes(final List<String> errorOutputCodes) {
        this.errorOutputCodes = errorOutputCodes;
        return this;
    }

    public ScenarioBuilder withBackground(final Consumer<BackgroundBuilder> backgroundBuilderConsumer) {
        final BackgroundBuilder backgroundBuilder = new BackgroundBuilder();
        backgroundBuilderConsumer.accept(backgroundBuilder);
        this.backgroundBuilder = backgroundBuilder;
        return this;
    }

    public ScenarioBuilder withInfo(final BasicInfo info) {
        this.info = info;
        return this;
    }

    public ScenarioBuilder withComment(final String comment) {
        this.comment = comment;
        return this;
    }

    public ScenarioBuilder addStep(final Consumer<StepBuilder> stepBuilderConsumer) {
        final StepBuilder stepBuilder = new StepBuilder();
        stepBuilderConsumer.accept(stepBuilder);
        stepBuilders.add(stepBuilder);
        return this;
    }

    public ScenarioBuilder addBeforeAction(final Consumer<AroundActionBuilder> aroundActionBuilderConsumer) {
        final AroundActionBuilder aroundActionBuilder = new AroundActionBuilder();
        aroundActionBuilderConsumer.accept(aroundActionBuilder);
        beforeActionBuilders.add(aroundActionBuilder);
        return this;
    }

    public ScenarioBuilder addAfterAction(final Consumer<AroundActionBuilder> aroundActionBuilderConsumer) {
        final AroundActionBuilder aroundActionBuilder = new AroundActionBuilder();
        aroundActionBuilderConsumer.accept(aroundActionBuilder);
        afterActionBuilders.add(aroundActionBuilder);
        return this;
    }

    protected String getScenarioKey() {
        return scenarioKey;
    }

    protected String getFeatureId() {
        return featureId;
    }

    protected String getTestRunId() {
        return testRunId;
    }

    protected String getLanguage() {
        return language;
    }

    protected Set<String> getTags() {
        return tags;
    }

    public Set<String> getExtraTags() {
        return extraTags;
    }

    public List<String> getErrorOutputCodes() {
        return errorOutputCodes;
    }

    protected BackgroundBuilder getBackgroundBuilder() {
        return backgroundBuilder;
    }

    protected BasicInfo getInfo() {
        return info;
    }

    protected String getComment() {
        return comment;
    }

    protected List<StepBuilder> getStepBuilders() {
        return stepBuilders;
    }

    protected List<AroundActionBuilder> getBeforeActionBuilders() {
        return beforeActionBuilders;
    }

    protected List<AroundActionBuilder> getAfterActionBuilders() {
        return afterActionBuilders;
    }

}
