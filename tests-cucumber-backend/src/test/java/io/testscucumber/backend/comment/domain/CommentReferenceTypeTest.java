package io.testscucumber.backend.comment.domain;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CommentReferenceTypeTest {

    @Test
    public void should_create_reference_from_type() throws Exception {
        // given
        final CommentReferenceType referenceType = CommentReferenceType.SCENARIO_ID;
        final String referenceValue = "value";

        // when
        final CommentReference commentReference = referenceType.createReference(referenceValue);

        // then
        assertThat(commentReference.getType()).isEqualTo(referenceType);
        assertThat(commentReference.getReference()).isEqualTo(referenceValue);
    }

}
