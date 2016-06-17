package io.zucchiniui.backend.comment.domain;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CommentReferenceTest {

    @Test
    public void should_create_reference() throws Exception {
        // given
        final CommentReferenceType referenceType = CommentReferenceType.SCENARIO_ID;
        final String referenceValue = "value";

        // when
        final CommentReference reference = new CommentReference(referenceType, referenceValue);

        // then
        assertThat(reference.getType()).isEqualTo(referenceType);
        assertThat(reference.getReference()).isEqualTo(referenceValue);
    }

}
