package io.testscucumber.backend.reportconverter.report;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class ReportScenario extends ReportFeatureElement {

    private String id;

    private List<Tag> tags = new ArrayList<>();

    @JsonProperty("before")
    private List<ReportAroundAction> beforeActions = new ArrayList<>();

    @JsonProperty("after")
    private List<ReportAroundAction> afterActions = new ArrayList<>();

    private List<ReportComment> comments = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(final List<Tag> tags) {
        this.tags = tags;
    }

    public List<ReportAroundAction> getBeforeActions() {
        return beforeActions;
    }

    public void setBeforeActions(final List<ReportAroundAction> beforeActions) {
        this.beforeActions = beforeActions;
    }

    public List<ReportAroundAction> getAfterActions() {
        return afterActions;
    }

    public void setAfterActions(final List<ReportAroundAction> afterActions) {
        this.afterActions = afterActions;
    }

    public List<ReportComment> getComments() {
        return comments;
    }

    public void setComments(final List<ReportComment> comments) {
        this.comments = comments;
    }

}
