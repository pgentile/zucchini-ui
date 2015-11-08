package example.reporting.model;

import com.google.common.base.MoreObjects;

import java.util.List;

public class FeatureElement {

    private BasicInfo info;

    private Location location;

    private List<Step> steps;

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(BasicInfo info) {
        this.info = info;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("info", info)
                .add("location", location)
                .toString();
    }

}
