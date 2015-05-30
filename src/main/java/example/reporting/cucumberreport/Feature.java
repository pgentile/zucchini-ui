package example.reporting.cucumberreport;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.MoreObjects;

import java.util.List;

public class Feature extends CucumberElement implements HasTags {

    private String id;

    @JsonProperty("uri")
    private String filename;

    private List<ScenarioElement> elements;

    private String description;

    private List<Tag> tags;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public List<ScenarioElement> getElements() {
        return elements;
    }

    public void setElements(List<ScenarioElement> elements) {
        this.elements = elements;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public List<Tag> getTags() {
        return tags;
    }

    @Override
    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @Override
    protected MoreObjects.ToStringHelper createToStringHelper() {
        return super.createToStringHelper()
                .add("id", id)
                .add("filename", filename)
                .add("size of elements", elements.size());
    }
}
