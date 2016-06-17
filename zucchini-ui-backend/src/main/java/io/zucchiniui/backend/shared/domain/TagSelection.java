package io.zucchiniui.backend.shared.domain;

import com.google.common.base.MoreObjects;
import com.google.common.collect.ImmutableSet;

import java.util.Collection;
import java.util.Objects;
import java.util.Set;

public final class TagSelection {

    private final Set<String> includedTags;

    private final Set<String> excludedTags;

    public TagSelection(final Collection<String> includedTags, final Collection<String> excludedTags) {
        this.includedTags = ImmutableSet.copyOf(includedTags);
        this.excludedTags = ImmutableSet.copyOf(excludedTags);
    }

    public Set<String> getIncludedTags() {
        return includedTags;
    }

    public Set<String> getExcludedTags() {
        return excludedTags;
    }

    public boolean isActive() {
        return !(includedTags.isEmpty() && excludedTags.isEmpty());
    }

    @Override
    public boolean equals(final Object obj) {
        if (obj == null) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        if (!getClass().equals(obj.getClass())) {
            return false;
        }

        final TagSelection other = (TagSelection) obj;
        return includedTags.equals(other.includedTags) && excludedTags.equals(other.excludedTags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(includedTags, excludedTags);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("includedTags", includedTags)
            .add("excludedTags", excludedTags)
            .toString();
    }

}
