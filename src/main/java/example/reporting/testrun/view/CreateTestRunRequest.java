package example.reporting.testrun.view;

import org.hibernate.validator.constraints.NotEmpty;

import java.util.HashMap;
import java.util.Map;

public class CreateTestRunRequest {

    @NotEmpty
    private String env;

    private Map<String, String> labels = new HashMap<>();

    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }

    public Map<String, String> getLabels() {
        return labels;
    }

    public void setLabels(Map<String, String> labels) {
        this.labels = labels;
    }

}
