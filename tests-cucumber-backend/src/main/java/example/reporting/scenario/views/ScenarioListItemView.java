package example.reporting.scenario.views;

import example.reporting.shared.domain.BasicInfo;
import example.reporting.scenario.domain.StepStatus;
import org.mongodb.morphia.annotations.Id;

import java.util.HashSet;
import java.util.Set;

public class ScenarioListItemView {

    @Id
    private String id;

    private BasicInfo info;

    private Set<String> tags = new HashSet<>();

    private StepStatus status;

    private String testRunId;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(final BasicInfo info) {
        this.info = info;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(final Set<String> tags) {
        this.tags = tags;
    }

    public StepStatus getStatus() {
        return status;
    }

    public void setStatus(final StepStatus status) {
        this.status = status;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(final String testRunId) {
        this.testRunId = testRunId;
    }
}
