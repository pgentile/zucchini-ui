package io.testscucumber.backend.comment.domain;

import com.google.common.collect.Sets;
import io.testscucumber.backend.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.PostLoad;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;

@Entity("commentGroups")
public class CommentGroup extends BaseEntity<String> {

    @Id
    private String id;

    private String type;

    @Indexed
    private Set<String> referenceIds;

    /**
     * Private constructor for Morphia.
     */
    private CommentGroup() {
    }

    public CommentGroup(final String type, final String firstReferenceId) {
        this.type = type;
        id = UUID.randomUUID().toString();
        referenceIds = Sets.newHashSet(firstReferenceId);
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public Set<String> getReferenceIds() {
        return Collections.unmodifiableSet(referenceIds);
    }

    @PostLoad
    protected void postLoad() {
        if (referenceIds == null) {
            referenceIds = Sets.newHashSet();
        }
    }

    @Override
    protected String getEntityId() {
        return id;
    }

}
