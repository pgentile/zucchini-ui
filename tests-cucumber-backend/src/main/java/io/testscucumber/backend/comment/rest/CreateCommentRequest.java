package io.testscucumber.backend.comment.rest;

import io.testscucumber.backend.comment.domain.CommentReference;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import java.util.List;

public class CreateCommentRequest {

    @Valid
    @NotEmpty
    private List<CommentReference> references;

    @NotEmpty
    private String content;

    public List<CommentReference> getReferences() {
        return references;
    }

    public void setReferences(List<CommentReference> references) {
        this.references = references;
    }

    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

}
