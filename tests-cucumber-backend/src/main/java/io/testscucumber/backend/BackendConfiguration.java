package io.testscucumber.backend;

import io.dropwizard.Configuration;
import io.dropwizard.metrics.MetricsFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

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
