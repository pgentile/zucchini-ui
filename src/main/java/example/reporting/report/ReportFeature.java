package example.reporting.report;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.List;

public class ReportFeature extends CucumberElement {

    private String id;

    @JsonProperty("uri")
    private String filename;

    private List<ReportFeatureElement> elements = new ArrayList<>();

    private String description;

    private List<Tag> tags = new ArrayList<>();

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

    public List<ReportFeatureElement> getElements() {
        return elements;
    }

    public void setElements(List<ReportFeatureElement> elements) {
        this.elements = elements;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Tag> getTags() {
        return tags;
    }

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
