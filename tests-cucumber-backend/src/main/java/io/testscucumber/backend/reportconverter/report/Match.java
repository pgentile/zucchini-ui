package io.testscucumber.backend.reportconverter.report;

import java.util.ArrayList;
import java.util.List;

public class Match {

    private List<ReportArgument> arguments = new ArrayList<>();

    public List<ReportArgument> getArguments() {
        return arguments;
    }

    public void setArguments(final List<ReportArgument> arguments) {
        this.arguments = arguments;
    }

}
