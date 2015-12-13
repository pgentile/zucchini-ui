package example.reporting.reportconverter.report;

import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.List;

public class Match {

    private String location;

    private List<ReportArgument> arguments = new ArrayList<>();

    public String getLocation() {
        return location;
    }

    public void setLocation(final String location) {
        this.location = location;
    }

    public List<ReportArgument> getArguments() {
        return arguments;
    }

    public void setArguments(final List<ReportArgument> arguments) {
        this.arguments = arguments;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("location", location)
                .toString();
    }

}
