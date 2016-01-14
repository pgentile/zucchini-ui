package io.testscucumber.backend.comment.rest;

import org.hibernate.validator.constraints.NotEmpty;

public class CreateCommentRequest {

    @NotEmpty
    private String type;

    @NotEmpty
    private String referenceId;

    @NotEmpty
    private String content;

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(final String referenceId) {
        this.referenceId = referenceId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

}
