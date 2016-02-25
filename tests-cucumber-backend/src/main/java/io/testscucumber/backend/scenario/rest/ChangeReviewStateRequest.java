package io.testscucumber.backend.scenario.rest;

public class ChangeReviewStateRequest {

    private boolean reviewed;

    public boolean isReviewed() {
        return reviewed;
    }

    public void setReviewed(final boolean reviewed) {
        this.reviewed = reviewed;
    }

}
