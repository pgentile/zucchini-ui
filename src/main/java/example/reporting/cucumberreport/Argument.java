package example.reporting.cucumberreport;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.MoreObjects;

public class Argument {

    @JsonProperty("val")
    private String value;

    private int offset;

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("value", value)
                .add("offset", offset)
                .toString();
    }

}
