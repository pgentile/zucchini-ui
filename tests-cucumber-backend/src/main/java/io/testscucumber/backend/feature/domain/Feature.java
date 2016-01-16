package io.testscucumber.backend.feature.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.shared.domain.Location;
import io.testscucumber.backend.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity("features")
public class Feature extends BaseEntity<String> {

    @Id
    private String id;

    @Indexed
    private String featureKey;

    @Indexed
    private String testRunId;

    private BasicInfo info;

    @Indexed
    private Set<String> tags = new HashSet<>();

    private Location location;

    private String description;

    private FeatureStatus status;

    private ZonedDateTime createdAt;

    private ZonedDateTime modifiedAt;

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
        status = other.status;
        modifiedAt = ZonedDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(final String testRunId) {
        this.testRunId = testRunId;
    }

    public String getFeatureKey() {
        return featureKey;
    }

    public void setFeatureKey(final String featureKey) {
        this.featureKey = featureKey;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(final BasicInfo info) {
        this.info = info;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(final Set<String> tags) {
        this.tags = tags;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(final Location location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public FeatureStatus getStatus() {
        return status;
    }

    public void setStatus(final FeatureStatus status) {
        this.status = status;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(final ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(final ZonedDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    @Override
    protected String getEntityId() {
        return getId();
    }

}
