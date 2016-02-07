package io.testscucumber.backend.reportconverter.report;

import com.google.common.base.MoreObjects;

public class ReportAroundAction {

    private Result result;

    public Result getResult() {
        return result;
    }

    public void setResult(final Result result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("result", result)
            .toString();
    }

}
