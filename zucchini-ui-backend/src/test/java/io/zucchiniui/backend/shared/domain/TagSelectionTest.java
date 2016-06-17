package io.zucchiniui.backend.shared.domain;

import com.google.common.collect.Sets;
import org.junit.Test;

import java.util.Collections;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class TagSelectionTest {

    @Test
    public void should_create_inactive_tag_selection() throws Exception {
        // given

        // when
        final TagSelection tagSelection = new TagSelection(Collections.emptySet(), Collections.emptySet());

        // then
        assertThat(tagSelection.getIncludedTags()).isEmpty();
        assertThat(tagSelection.getExcludedTags()).isEmpty();
        assertThat(tagSelection.isActive()).isFalse();
    }

    @Test
    public void should_create_active_tag_selection_with_only_included_tags() throws Exception {
        // given
        final Set<String> includedTags = Sets.newHashSet("toto", "tutu");

        // when
        final TagSelection tagSelection = new TagSelection(includedTags, Collections.emptySet());

        // then
        assertThat(tagSelection.getIncludedTags()).isEqualTo(includedTags);
        assertThat(tagSelection.getExcludedTags()).isEmpty();
        assertThat(tagSelection.isActive()).isTrue();
    }

    @Test
    public void should_create_active_tag_selection_with_only_excluded_tags() throws Exception {
        // given
        final Set<String> excludedTags = Sets.newHashSet("toto", "tutu");

        // when
        final TagSelection tagSelection = new TagSelection(Collections.emptySet(), excludedTags);

        // then
        assertThat(tagSelection.getIncludedTags()).isEmpty();
        assertThat(tagSelection.getExcludedTags()).isEqualTo(excludedTags);
        assertThat(tagSelection.isActive()).isTrue();
    }

    @Test
    public void should_create_active_tag_selection_with_included_and_excluded_tags() throws Exception {
        // given
        final Set<String> includedTags = Sets.newHashSet("tata", "tete");
        final Set<String> excludedTags = Sets.newHashSet("toto", "tutu");

        // when
        final TagSelection tagSelection = new TagSelection(includedTags, excludedTags);

        // then
        assertThat(tagSelection.getIncludedTags()).isEqualTo(includedTags);
        assertThat(tagSelection.getExcludedTags()).isEqualTo(excludedTags);
        assertThat(tagSelection.isActive()).isTrue();
    }

}
