package io.testscucumber.backend.shared.domain;

public interface TagSelectionQuery<Q extends TagSelectionQuery> {

    Q withTag(String tag);

    Q withSelectedTags(TagSelection tagSelection);

}
