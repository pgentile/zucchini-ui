package io.zucchiniui.capsule;

class UIConfig {

    private String backendBaseUri;

    private String basename;

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
