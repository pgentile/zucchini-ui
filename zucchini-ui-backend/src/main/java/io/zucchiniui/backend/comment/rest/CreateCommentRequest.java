package io.zucchiniui.backend.comment.rest;

import jakarta.validation.constraints.NotEmpty;

public class CreateCommentRequest {

    @NotEmpty
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

}
