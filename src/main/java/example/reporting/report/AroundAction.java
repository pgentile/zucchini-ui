package example.reporting.report;

import com.google.common.base.MoreObjects;

public class AroundAction {

    private Result result;

    private Match match;

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

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("result", result)
                .add("match", match)
                .toString();
    }

}
