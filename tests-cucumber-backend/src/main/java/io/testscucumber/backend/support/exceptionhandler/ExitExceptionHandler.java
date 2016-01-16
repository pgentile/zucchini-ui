package io.testscucumber.backend.support.exceptionhandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExitExceptionHandler implements Thread.UncaughtExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExitExceptionHandler.class);

    @Override
    public void uncaughtException(final Thread thread, final Throwable exception) {
        LOGGER.error("Caught exception on thread {}", thread, exception);

        System.err.println("System halted because of a fatal exception");
        exception.printStackTrace(System.err);
        System.exit(1);
    }

}
