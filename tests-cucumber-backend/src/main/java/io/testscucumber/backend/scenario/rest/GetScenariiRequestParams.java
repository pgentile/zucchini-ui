package io.testscucumber.backend.scenario.rest;

import javax.ws.rs.QueryParam;
import java.util.ArrayList;
import java.util.List;

public class GetScenariiRequestParams {

    @QueryParam("testRunId")
    private String testRunId;

    @QueryParam("featureId")
    private String featureId;

    @QueryParam("tag")
    private List<String> tags;

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

    public List<String> getTags() {
        if (tags == null) {
            tags = new ArrayList<>();
        }
        return tags;
    }

    public void setTags(final List<String> tags) {
        this.tags = tags;
    }

}
