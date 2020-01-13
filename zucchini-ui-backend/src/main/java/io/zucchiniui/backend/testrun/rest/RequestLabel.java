package io.zucchiniui.backend.testrun.rest;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotEmpty;

public class RequestLabel {

    @NotEmpty
    private final String name;

    @NotEmpty
    private final String value;

    @URL
    private final String url;

    @JsonCreator
    public RequestLabel(
        @JsonProperty("name") final String name,
        @JsonProperty("value") final String value,
        @JsonProperty("url") final String url) {
        this.name = name;
        this.value = value;
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public String getUrl() {
        return url;
    }

}
