package example.reporting.model;

import com.google.common.base.MoreObjects;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Feature {

    private String id;

    private BasicInfo info;

    private Set<String> tags = new HashSet<>();

    private Location location;

    private List<FeatureElement> elements;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(BasicInfo info) {
        this.info = info;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<FeatureElement> getElements() {
        return elements;
    }

    public void setElements(List<FeatureElement> elements) {
        this.elements = elements;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("id", id)
                .add("info", info)
                .add("location", location)
                .add("tags", tags)
                .toString();
    }

}
