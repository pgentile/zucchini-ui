package io.zucchiniui.app;

import io.zucchiniui.backend.BackendConfiguration;

public class ZucchiniUIConfiguration extends BackendConfiguration {

    private final FrontendConfig frontend = new FrontendConfig();

    public FrontendConfig getFrontend() {
        return frontend;
    }
}
