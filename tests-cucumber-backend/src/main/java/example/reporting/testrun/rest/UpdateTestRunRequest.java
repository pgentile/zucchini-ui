package example.reporting.testrun.rest;

import java.util.HashMap;
import java.util.Map;

public class UpdateTestRunRequest {

    private Map<String, String> labels = new HashMap<>();

    public Map<String, String> getLabels() {
        return labels;
    }

    public void setLabels(final Map<String, String> labels) {
        this.labels = labels;
    }

}
