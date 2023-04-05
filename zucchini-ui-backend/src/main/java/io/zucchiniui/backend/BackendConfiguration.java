package io.zucchiniui.backend;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.dropwizard.core.Configuration;
import io.dropwizard.metrics.common.MetricsFactory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BackendConfiguration extends Configuration {

    @NotNull
    private String mongoUri;

    @Valid
    private final MetricsFactory metrics = new MetricsFactory();

    public String getMongoUri() {
        return mongoUri;
    }

    public void setMongoUri(final String mongoUri) {
        this.mongoUri = mongoUri;
    }

    public MetricsFactory getMetrics() {
        return metrics;
    }

}
