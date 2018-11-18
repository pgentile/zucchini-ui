package io.zucchiniui.app;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

class UIConfig {

    @JsonUnwrapped
    private final FrontendConfig frontendConfig;

    private String backendBaseUri;

    private String basename;

    public UIConfig(FrontendConfig frontendConfig) {
        this.frontendConfig = frontendConfig;
    }

    public FrontendConfig getFrontendConfig() {
        return frontendConfig;
    }

    public String getBackendBaseUri() {
        return backendBaseUri;
    }

    public void setBackendBaseUri(final String backendBaseUri) {
        this.backendBaseUri = backendBaseUri;
    }

    public String getBasename() {
        return basename;
    }

    public void setBasename(String basename) {
        this.basename = basename;
    }

}
