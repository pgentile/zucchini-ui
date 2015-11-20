package example.reporting.utils;

import io.dropwizard.lifecycle.Managed;

public class AutoCloseableManaged implements Managed {

    private final AutoCloseable autoCloseable;

    public AutoCloseableManaged(final AutoCloseable autoCloseable) {
        this.autoCloseable = autoCloseable;
    }

    @Override
    public void start() throws Exception {
        // Nothing to do
    }

    @Override
    public void stop() throws Exception {
        autoCloseable.close();
    }

}
