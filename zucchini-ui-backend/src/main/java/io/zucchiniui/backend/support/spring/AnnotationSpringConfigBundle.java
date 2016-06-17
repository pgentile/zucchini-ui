package io.zucchiniui.backend.support.spring;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AnnotationSpringConfigBundle extends AbstractSpringBundle {

    private final Class<?>[] configClasses;

    public AnnotationSpringConfigBundle(final Class<?>... configClasses) {
        this.configClasses = configClasses;
    }

    @Override
    protected ConfigurableApplicationContext createApplicationContext() {
        final AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        applicationContext.register(configClasses);
        return applicationContext;
    }

}
