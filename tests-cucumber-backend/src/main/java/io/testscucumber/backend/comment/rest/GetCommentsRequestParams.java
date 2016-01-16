package io.testscucumber.backend.comment.rest;

import org.hibernate.validator.constraints.NotEmpty;

import javax.ws.rs.QueryParam;

public class GetCommentsRequestParams {

    @NotEmpty
    @QueryParam("referenceType")
    private String referenceType;

    @NotEmpty
    @QueryParam("reference")
    private String reference;

    public String getReferenceType() {
        return referenceType;
    }

    public void setReferenceType(final String referenceType) {
        this.referenceType = referenceType;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(final String referenceId) {
        reference = referenceId;
    }

}
