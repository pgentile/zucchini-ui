package io.testscucumber.backend.comment.rest;

import org.hibernate.validator.constraints.NotEmpty;

public class UpdateCommentRequest {

    @NotEmpty
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

}
