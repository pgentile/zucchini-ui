package example.reporting.model;

import com.google.common.base.MoreObjects;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.HashSet;
import java.util.Set;

@Entity("features")
public class Feature {

    @Id
    private String id;

    private String featureKey;

    private String testRunId;

    private BasicInfo info;

    private Set<String> tags = new HashSet<>();

    private Location location;

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

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("id", id)
                .add("featureKey", featureKey)
                .add("info", info)
                .add("location", location)
                .add("tags", tags)
                .toString();
    }

}
