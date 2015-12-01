package example.reporting.scenario.model;

import com.google.common.base.MoreObjects;
import example.reporting.shared.model.BasicInfo;
import example.reporting.shared.model.Location;

public class Step {

    private BasicInfo info;

    private Location location;

    private StepStatus status;

    private String errorMessage;

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

    public StepStatus getStatus() {
        return status;
    }

    public void setStatus(final StepStatus status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
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
