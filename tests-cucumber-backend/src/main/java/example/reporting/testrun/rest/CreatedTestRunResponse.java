package example.reporting.testrun.rest;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreatedTestRunResponse {

    private final String id;

    @JsonCreator
    public CreatedTestRunResponse(@JsonProperty("id") final String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

}
