package io.testscucumber.backend.comment.domain;

import io.testscucumber.backend.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity("comments")
public class Comment extends BaseEntity<String> {

    @Id
    private String id;

    @Indexed
    private String groupId;

    private ZonedDateTime date;

    private String content;

    /**
     * Private constructor for Morphia.
     */
    private Comment() {
    }

    public Comment(final String groupId, final String content) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.groupId = groupId;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public String getGroupId() {
        return groupId;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public String getContent() {
        return content;
    }

    @Override
    protected String getEntityId() {
        return id;
    }

}
