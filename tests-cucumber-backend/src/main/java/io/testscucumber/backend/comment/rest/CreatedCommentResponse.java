package io.testscucumber.backend.comment.rest;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreatedCommentResponse {

    private final String id;

    @JsonCreator
    public CreatedCommentResponse(@JsonProperty("id") final String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

}
