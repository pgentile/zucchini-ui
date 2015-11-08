package example.reporting.model;

import com.google.common.base.MoreObjects;

import java.util.HashSet;
import java.util.Set;

public class Scenario extends FeatureElement {

    private String id;

    private Set<String> tags = new HashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("id", id)
                .add("info", getInfo())
                .add("location", getLocation())
                .add("tags", tags)
                .toString();
    }

}
