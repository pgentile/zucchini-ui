package io.zucchiniui.backend.reportconverter.report;

import java.util.ArrayList;
import java.util.List;

public class Match {

    private List<ReportArgument> arguments = new ArrayList<>();

    private String location;

    public List<ReportArgument> getArguments() {
        return arguments;
    }

    public void setArguments(final List<ReportArgument> arguments) {
        this.arguments = arguments;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
