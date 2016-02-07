package io.testscucumber.backend.reportconverter.report;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.List;

public class ReportStep extends CucumberElement {

    private Result result;

    private Match match;

    @JsonProperty("rows")
    private List<TableRow> tableRows = new ArrayList<>();

    private List<ReportComment> comments = new ArrayList<>();

    public Result getResult() {
        return result;
    }

    public void setResult(final Result result) {
        this.result = result;
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

    public List<ReportComment> getComments() {
        return comments;
    }

    public void setComments(final List<ReportComment> comments) {
        this.comments = comments;
    }

    @Override
    protected MoreObjects.ToStringHelper createToStringHelper() {
        return super.createToStringHelper()
                .add("result", result)
                .add("match", match);
    }
}
