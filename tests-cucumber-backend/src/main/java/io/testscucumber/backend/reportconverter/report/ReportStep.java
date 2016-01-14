package io.testscucumber.backend.reportconverter.report;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.List;

public class ReportStep extends CucumberElement {

    private Result result;

    @JsonProperty("error_message")
    private String errorMessage;

    private Match match;

    @JsonProperty("rows")
    private List<TableRow> tableRows = new ArrayList<>();

    public Result getResult() {
        return result;
    }

    public void setResult(final Result result) {
        this.result = result;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(final Match match) {
        this.match = match;
    }

    public List<TableRow> getTableRows() {
        return tableRows;
    }

    public void setTableRows(final List<TableRow> tableRows) {
        this.tableRows = tableRows;
    }

    @Override
    protected MoreObjects.ToStringHelper createToStringHelper() {
        return super.createToStringHelper()
                .add("result", result)
                .add("match", match);
    }
}
