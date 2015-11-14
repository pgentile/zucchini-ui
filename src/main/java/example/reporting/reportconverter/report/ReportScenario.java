package example.reporting.reportconverter.report;

import java.util.ArrayList;
import java.util.List;

public class ReportScenario extends ReportFeatureElement {

    private String id;

    private List<Tag> tags = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(final List<Tag> tags) {
        this.tags = tags;
    }

}
