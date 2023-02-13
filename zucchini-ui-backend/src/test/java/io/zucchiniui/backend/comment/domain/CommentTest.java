package io.zucchiniui.backend.comment.domain;

import com.google.common.collect.Sets;
import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.shared.domain.ItemReferenceType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class CommentTest {

    private static final Set<ItemReference> REFERENCES = Sets.newHashSet(
        ItemReferenceType.SCENARIO_ID.createReference("scenarioId"),
        ItemReferenceType.TEST_RUN_ID.createReference("testRunId")
    );

    private static final String CONTENT = "content";

    @Test
    void should_create_comment() {
        // given
        final ZonedDateTime testStartDate = ZonedDateTime.now();

        // when
        final Comment comment = new Comment(REFERENCES, CONTENT);

        // then
        assertThat(comment.getId()).isNotEmpty();
        Assertions.assertThat(comment.getReferences()).isEqualTo(REFERENCES);
        assertThat(comment.getContent()).isEqualTo(CONTENT);
        assertThat(comment.getDate()).isAfterOrEqualTo(testStartDate);

        assertThat(comment.getEntityId()).isEqualTo(comment.getId());
    }

    @Test
    public void should_set_description() {
        // given
        final String newContent = "newContent";

        final Comment comment = new Comment(REFERENCES, CONTENT);

        // when
        comment.setContent(newContent);

        // then
        assertThat(comment.getContent()).isEqualTo(newContent);
    }

}
