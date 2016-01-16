package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.shared.domain.Location;

import java.util.ArrayList;
import java.util.List;

public class Background {

    private BasicInfo info;

    private Location location;

    private List<Step> steps = new ArrayList<>();

    protected void changeStatus(final StepStatus newStatus) {
        for (final Step step: steps) {
            step.changeStatus(newStatus);
        }
    }

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(final BasicInfo info) {
        this.info = info;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(final Location location) {
        this.location = location;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(final List<Step> steps) {
        this.steps = steps;
    }

}
