package io.zucchiniui.backend.comment.domain;

/**
 * Reference type.
 */
public enum CommentReferenceType {

    TEST_RUN_ID,
    SCENARIO_ID,
    SCENARIO_KEY;

    /**
     * Create a new reference based on current type.
     *
     * @param reference Reference
     * @return Created reference
     */
    public CommentReference createReference(final String reference) {
        return new CommentReference(this, reference);
    }

}
