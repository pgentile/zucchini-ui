package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;

import java.util.List;

public class StepBuilder {

    private BasicInfo info;

    private String definitionSource;

    private StepStatus status = StepStatus.NOT_RUN;

    private String errorMessage;

    private String[][] table;

    private String comment;

    private String output;

    private List<Attachment> attachments;

    public StepBuilder withInfo(final BasicInfo info) {
        this.info = info;
        return this;
    }

    public StepBuilder withStatus(final StepStatus status) {
        this.status = status;
        return this;
    }

    public StepBuilder withErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    }

    public StepBuilder withTable(final String[][] table) {
        this.table = table;
        return this;
    }

    public StepBuilder withComment(final String comment) {
        this.comment = comment;
        return this;
    }

    public StepBuilder withOutput(String output) {
        this.output = output;
        return this;
    }

    public StepBuilder withAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
        return this;
    }

    public StepBuilder withDefinitionSource(String definitionSource) {
        this.definitionSource = definitionSource;
        return this;
    }

    public Step build() {
        return new Step(this);
    }

    protected BasicInfo getInfo() {
        return info;
    }

    protected StepStatus getStatus() {
        return status;
    }

    protected String getErrorMessage() {
        return errorMessage;
    }

    protected String[][] getTable() {
        return table;
    }

    protected String getComment() {
        return comment;
    }

    public String getOutput() {
        return output;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public String getDefinitionSource() {
        return definitionSource;
    }

}
