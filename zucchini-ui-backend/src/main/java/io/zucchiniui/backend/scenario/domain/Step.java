package io.zucchiniui.backend.scenario.domain;

import com.google.common.base.MoreObjects;
import io.zucchiniui.backend.shared.domain.BasicInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Step {

    private BasicInfo info;

    private StepStatus status;

    private String errorMessage;

    private String[][] table;

    private String comment;

    private String output;

    private List<Attachment> attachments = new ArrayList<>();

    private String definitionSource;

    /**
     * Private constructor for Morphia.
     */
    private Step() {

    }

    protected Step(final StepBuilder builder) {
        info = Objects.requireNonNull(builder.getInfo());
        status = Objects.requireNonNull(builder.getStatus());
        errorMessage = builder.getErrorMessage();
        table = builder.getTable();
        comment = builder.getComment();
        output = builder.getOutput();
        attachments = builder.getAttachments();
        definitionSource = builder.getDefinitionSource();
    }

    public BasicInfo getInfo() {
        return info;
    }

    public StepStatus getStatus() {
        return status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String[][] getTable() {
        return table;
    }

    public String getComment() {
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

    protected Step copy() {
        final Step newStep = new Step();
        newStep.info = info;
        newStep.status = status;
        newStep.errorMessage = errorMessage;
        newStep.table = table;
        newStep.comment = comment;
        newStep.output = output;
        newStep.attachments = attachments;
        newStep.definitionSource = definitionSource;
        return newStep;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("info", info)
            .add("status", status)
            .toString();
    }

    protected void setStatus(final StepStatus newStatus) {
        Objects.requireNonNull(newStatus);

        if (newStatus == status) {
            return;
        }

        status = newStatus;
        if (newStatus != StepStatus.FAILED && newStatus != StepStatus.UNDEFINED) {
            errorMessage = null;
        }
    }

    protected void clearOutput() {
        output = null;
    }

}
