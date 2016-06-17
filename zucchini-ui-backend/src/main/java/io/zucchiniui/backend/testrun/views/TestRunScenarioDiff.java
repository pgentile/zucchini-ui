package io.zucchiniui.backend.testrun.views;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.zucchiniui.backend.scenario.views.ScenarioListItemView;
import io.zucchiniui.backend.testrun.domain.TestRun;

import java.util.ArrayList;
import java.util.List;

public class TestRunScenarioDiff {

    public static class ScenarioDiff {

        private final ScenarioListItemView left;

        private final ScenarioListItemView right;

        @JsonCreator
        public ScenarioDiff(@JsonProperty("left") final ScenarioListItemView left, @JsonProperty("right") final ScenarioListItemView right) {
            this.left = left;
            this.right = right;
        }

        public ScenarioListItemView getLeft() {
            return left;
        }

        public ScenarioListItemView getRight() {
            return right;
        }

    }

    private TestRun leftTestRun;

    private TestRun rightTestRun;

    private List<ScenarioListItemView> newScenarii = new ArrayList<>();

    private List<ScenarioListItemView> deletedScenarii = new ArrayList<>();

    private List<ScenarioDiff> differentScenarii = new ArrayList<>();

    public TestRun getLeftTestRun() {
        return leftTestRun;
    }

    public void setLeftTestRun(final TestRun leftTestRun) {
        this.leftTestRun = leftTestRun;
    }

    public TestRun getRightTestRun() {
        return rightTestRun;
    }

    public void setRightTestRun(final TestRun rightTestRun) {
        this.rightTestRun = rightTestRun;
    }

    public List<ScenarioListItemView> getNewScenarii() {
        return newScenarii;
    }

    public void setNewScenarii(final List<ScenarioListItemView> newScenarii) {
        this.newScenarii = newScenarii;
    }

    public List<ScenarioListItemView> getDeletedScenarii() {
        return deletedScenarii;
    }

    public void setDeletedScenarii(final List<ScenarioListItemView> deletedScenarii) {
        this.deletedScenarii = deletedScenarii;
    }

    public List<ScenarioDiff> getDifferentScenarii() {
        return differentScenarii;
    }

    public void setDifferentScenarii(final List<ScenarioDiff> differentScenarii) {
        this.differentScenarii = differentScenarii;
    }

}
