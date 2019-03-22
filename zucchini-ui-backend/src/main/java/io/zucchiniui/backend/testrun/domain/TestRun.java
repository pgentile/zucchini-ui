package io.zucchiniui.backend.testrun.domain;

import io.zucchiniui.backend.support.ddd.BaseEntity;
import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;

import java.time.ZonedDateTime;
import java.util.*;

@Entity("testRuns")
public class TestRun extends BaseEntity<String> {

    @Id
    private String id;

    private String type;

    private String environment;

    private String name;

    private ZonedDateTime date;

    private List<Label> labels = new ArrayList<>();

    /**
     * Private constructor for Morphia.
     */
    private TestRun() {
    }

    public TestRun(final String type) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.type = Objects.requireNonNull(type);
    }

    public TestRun(final String type, final String environment, final String name) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.type = Objects.requireNonNull(type);
        this.environment = Objects.requireNonNull(environment);
        this.name = Objects.requireNonNull(name);
    }

    public void setType(final String type) {
        this.type = Objects.requireNonNull(type);
    }

    public void setEnvironment(final String environment) {
        this.environment = Objects.requireNonNull(environment);
    }

    public void setName(final String name) {
        this.name = Objects.requireNonNull(name);
    }

    public void setLabels(final List<Label> labels) {
        this.labels = new ArrayList<>(labels);
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getEnvironment() {
        return environment;
    }

    public String getName() {
        return name;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public List<Label> getLabels() {
        return Collections.unmodifiableList(labels);
    }

    @Override
    protected String getEntityId() {
        return id;
    }

}
