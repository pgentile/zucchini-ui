package io.zucchiniui.backend.shared.domain;

/**
 * Reference type.
 */
public enum ItemReferenceType {

    TEST_RUN_ID,
    SCENARIO_ID,
    SCENARIO_KEY;

    /**
     * Create a new reference based on current type.
     *
     * @param reference Reference
     * @return Created reference
     */
    public ItemReference createReference(final String reference) {
        return new ItemReference(this, reference);
    }

}
