package io.zucchiniui.backend;

import io.dropwizard.Configuration;
import io.dropwizard.metrics.MetricsFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;

public class BackendConfiguration extends Configuration {

    @NotNull
    private String mongoUri;

    @Valid
    private final MetricsFactory metrics = new MetricsFactory();

    private Map<String, String> errorOutputCodesPatterns = new HashMap<>();

    public String getMongoUri() {
        return mongoUri;
    }

    public void setMongoUri(final String mongoUri) {
        this.mongoUri = mongoUri;
    }

    public MetricsFactory getMetrics() {
        return metrics;
    }

    public Map<String, String> getErrorOutputCodesPatterns() {
        return errorOutputCodesPatterns;
    }

}
