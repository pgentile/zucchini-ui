package io.testscucumber.backend.comment.rest;

import org.hibernate.validator.constraints.NotEmpty;

import javax.ws.rs.QueryParam;

public class GetCommentsRequestParams {

    @NotEmpty
    @QueryParam("type")
    private String type;

    @NotEmpty
    @QueryParam("referenceId")
    private String referenceId;

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

}
