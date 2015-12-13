package example.reporting.application;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import io.dropwizard.client.JerseyClientConfiguration;
import io.dropwizard.metrics.MetricsFactory;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class CucumberReportConfiguration extends Configuration {

    @NotNull
    private String mongoUri;

    @Valid
    @NotNull
    @JsonProperty("selfClient")
    private JerseyClientConfiguration selfClientConfig = new JerseyClientConfiguration();

    @NotEmpty
    private String selfUrl;

    @Valid
    private MetricsFactory metrics = new MetricsFactory();

    public String getMongoUri() {
        return mongoUri;
    }

    public void setMongoUri(final String mongoUri) {
        this.mongoUri = mongoUri;
    }

    public String getSelfUrl() {
        return selfUrl;
    }

    public void setSelfUrl(final String selfUrl) {
        this.selfUrl = selfUrl;
    }

    public JerseyClientConfiguration getSelfClientConfig() {
        return selfClientConfig;
    }

    public MetricsFactory getMetrics() {
        return metrics;
    }

    public void setMetrics(MetricsFactory metrics) {
        this.metrics = metrics;
    }
}
