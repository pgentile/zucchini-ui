package io.zucchiniui.backend.feature.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;
import io.zucchiniui.backend.shared.domain.Location;
import io.zucchiniui.backend.support.ddd.BaseEntity;
import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;
import xyz.morphia.annotations.Version;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Feature.
 */
@Entity("features")
public class Feature extends BaseEntity<String> {

    /**
     * ID.
     */
    @Id
    private String id;

    private String language;

    /**
     * Feature key, useful for following multiple executions of a same feature over time.
     */
    private String featureKey;

    /**
     * Test run ID.
     */
    private String testRunId;

    /**
     * Information about feature.
     */
    private BasicInfo info;

    /**
     * Tags.
     */
    private Set<String> tags = new HashSet<>();

    /**
     * Location.
     */
    private Location location;

    /**
     * Description.
     */
    private String description;

    /**
     * Feature group.
     */
    private String group;

    /**
     * Status.
     */
    private FeatureStatus status;

    /**
     * Creation date.
     */
    private ZonedDateTime createdAt;

    /**
     * Modification date.
     */
    private ZonedDateTime modifiedAt;

    /**
     * Version, used for optimistic locking.
     */
    @Version
    private long version;

    /**
     * Private constructor for Morphia.
     */
    private Feature() {
    }

    /**
     * Create a new feature.
     *
     * @param featureKey Feature key
     * @param testRunId  Test run ID
     * @param info       Basic information
     * @param location   Feature location
     */
    public Feature(final String featureKey, final String testRunId, final BasicInfo info, final Location location, final String language) {
        id = UUID.randomUUID().toString();
        status = FeatureStatus.NOT_RUN;

        final ZonedDateTime now = ZonedDateTime.now();
        createdAt = now;
        modifiedAt = now;

        this.featureKey = featureKey;
        this.testRunId = testRunId;
        this.info = info;
        this.location = location;
        this.language = language;
    }

    /**
     * Update current feature with informations from another feature.
     *
     * @param other Oher feature to merge with
     */
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

    /**
     * Change feature status.
     *
     * @param newStatus New status
     */
    public void setStatus(final FeatureStatus newStatus) {
        if (newStatus != status) {
            status = newStatus;
            modifiedAt = ZonedDateTime.now();
        }
    }

    /**
     * Update tags.
     *
     * @param tags New tags
     */
    public void setTags(final Set<String> tags) {
        if (!this.tags.equals(tags)) {
            this.tags = new HashSet<>(tags);
            modifiedAt = ZonedDateTime.now();
        }
    }

    /**
     * Update description.
     *
     * @param description New description
     */
    public void setDescription(final String description) {
        this.description = description;
        modifiedAt = ZonedDateTime.now();
    }

    /**
     * Update group.
     *
     * @param group New group
     */
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

    public String getLanguage() {
        return language;
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

    public long getVersion() {
        return version;
    }

    @Override
    protected String getEntityId() {
        return getId();
    }

}
