package io.testscucumber.backend.testrun.domain;

import io.testscucumber.backend.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity("testRuns")
public class TestRun extends BaseEntity<String> {

    @Id
    private String id;

    private String type;

    private ZonedDateTime date;

    /**
     * Private constructor for Morphia.
     */
    private TestRun() {
    }

    public TestRun(final String type) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    @Override
    protected String getEntityId() {
        return id;
    }

}
