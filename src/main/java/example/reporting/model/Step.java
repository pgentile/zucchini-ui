package example.reporting.model;

import com.google.common.base.MoreObjects;

public class Step {

    private BasicInfo info;

    private Location location;

    private StepStatus status;

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

    public StepStatus getStatus() {
        return status;
    }

    public void setStatus(StepStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("info", info)
                .add("location", location)
                .add("status", status)
                .toString();
    }

}
