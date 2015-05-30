package example.reporting.cucumberreport;

import com.google.common.base.MoreObjects;

public class StepResult {

    private long duration;

    private String status;

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("status", status)
                .add("duration", duration)
                .toString();
    }
}
