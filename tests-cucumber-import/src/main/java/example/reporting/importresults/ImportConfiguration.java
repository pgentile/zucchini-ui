package example.reporting.importresults;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import io.dropwizard.client.JerseyClientConfiguration;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class ImportConfiguration extends Configuration {

    @Valid
    @NotNull
    @JsonProperty("selfClient")
    private final JerseyClientConfiguration selfClientConfig = new JerseyClientConfiguration();

    @NotEmpty
    private String selfUrl;


    public JerseyClientConfiguration getSelfClientConfig() {
        return selfClientConfig;
    }

    public String getSelfUrl() {
        return selfUrl;
    }

    public void setSelfUrl(String selfUrl) {
        this.selfUrl = selfUrl;
    }

}
