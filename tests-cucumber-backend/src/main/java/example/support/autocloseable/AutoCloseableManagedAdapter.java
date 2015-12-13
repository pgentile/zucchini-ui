package example.support.autocloseable;

import io.dropwizard.lifecycle.Managed;

public class AutoCloseableManagedAdapter implements Managed {

    private final AutoCloseable autoCloseable;

    public AutoCloseableManagedAdapter(final AutoCloseable autoCloseable) {
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
