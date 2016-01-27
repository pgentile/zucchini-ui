package io.testscucumber.backend.feature.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.shared.domain.Location;
import io.testscucumber.backend.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity("features")
public class Feature extends BaseEntity<String> {

    @Id
    private String id;

    private String featureKey;

    private String testRunId;

    private BasicInfo info;

    private Set<String> tags = new HashSet<>();

    private Location location;

    private String description;

    private String group;

    private FeatureStatus status;

    private ZonedDateTime createdAt;

    private ZonedDateTime modifiedAt;

    /**
     * Private constructor for Morphia.
     */
    private Feature() {
    }

    /**
     * Feature constructor
     *
     * @param featureKey Feature key
     * @param testRunId  Test run ID
     * @param info       Basic information
     * @param location   Feature location
     */
    public Feature(final String featureKey, final String testRunId, final BasicInfo info, final Location location) {
        id = UUID.randomUUID().toString();
        status = FeatureStatus.NOT_RUN;

        final ZonedDateTime now = ZonedDateTime.now();
        createdAt = now;
        modifiedAt = now;

        this.featureKey = featureKey;
        this.testRunId = testRunId;
        this.info = info;
        this.location = location;
    }

    public void mergeWith(final Feature other) {
        if (!featureKey.equals(other.featureKey)) {
            throw new IllegalArgumentException("Same feature key is required");
        }
        if (!testRunId.equals(other.testRunId)) {
            throw new IllegalArgumentException("Same test run ID is required");
        }

        info = other.info;
        tags = new HashSet<>(other.tags);
        location = other.location;
        description = other.description;

        if (other.group != null) {
            group = other.group;
        }

        status = other.status;
        modifiedAt = ZonedDateTime.now();
    }

    public void setStatus(final FeatureStatus newStatus) {
        if (newStatus != status) {
            status = newStatus;
            modifiedAt = ZonedDateTime.now();
        }
    }

    public void setInfo(final BasicInfo info) {
        this.info = info;
    }

    public void setTags(final Set<String> tags) {
        if (!this.tags.equals(tags)) {
            this.tags = new HashSet<>(tags);
            modifiedAt = ZonedDateTime.now();
        }
    }

    public void setDescription(final String description) {
        this.description = description;
        modifiedAt = ZonedDateTime.now();
    }

    public void setGroup(final String group) {
        this.group = group;
        modifiedAt = ZonedDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public String getFeatureKey() {
        return featureKey;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public Set<String> getTags() {
        return Collections.unmodifiableSet(tags);
    }

    public Location getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getGroup() {
        return group;
    }

    public FeatureStatus getStatus() {
        return status;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getModifiedAt() {
        return modifiedAt;
    }

    @Override
    protected String getEntityId() {
        return getId();
    }

}
