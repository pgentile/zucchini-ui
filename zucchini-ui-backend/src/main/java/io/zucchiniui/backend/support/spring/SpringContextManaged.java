package io.zucchiniui.backend.support.spring;

import io.dropwizard.lifecycle.Managed;
import org.springframework.context.ConfigurableApplicationContext;

class SpringContextManaged implements Managed {

    private final ConfigurableApplicationContext applicationContext;

    public SpringContextManaged(final ConfigurableApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void start() throws Exception {
        // TODO Start ?
    }

    @Override
    public void stop() throws Exception {
        applicationContext.stop();
        applicationContext.close();
    }

}
