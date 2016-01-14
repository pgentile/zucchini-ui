package io.testscucumber.backend.testrun.domain;

import io.testscucumber.backend.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.PostLoad;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Entity("testRuns")
public class TestRun extends BaseEntity<String> {

    @Id
    private String id;

    @Indexed
    private String env;

    private ZonedDateTime date;

    private Map<String, String> labels;

    /**
     * Private constructor for Morphia.
     */
    private TestRun() {
    }

    public TestRun(final String env, final Map<String, String> labels) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.env = env;
        this.labels = new HashMap<>(labels);
    }

    public String getId() {
        return id;
    }

    public String getEnv() {
        return env;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Map<String, String> getLabels() {
        return Collections.unmodifiableMap(labels);
    }

    public void setLabels(final Map<String, String> labels) {
        this.labels = new HashMap<>(labels);
    }

    @PostLoad
    protected void postLoad() {
        if (labels == null) {
            labels = Collections.emptyMap();
        }
    }

    @Override
    protected String getEntityId() {
        return id;
    }

}
