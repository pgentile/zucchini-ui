package io.testscucumber.backend.scenario.rest;

import javax.ws.rs.QueryParam;
import java.util.HashSet;
import java.util.Set;

public class GetScenariiRequestParams {

    @QueryParam("testRunId")
    private String testRunId;

    @QueryParam("featureId")
    private String featureId;

    @QueryParam("tag")
    private Set<String> tags;

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(final String testRunId) {
        this.testRunId = testRunId;
    }

    public String getFeatureId() {
        return featureId;
    }

    public void setFeatureId(final String featureId) {
        this.featureId = featureId;
    }

    public Set<String> getTags() {
        if (tags == null) {
            tags = new HashSet<>();
        }
        return tags;
    }

    public void setTags(final Set<String> tags) {
        this.tags = tags;
    }

}
