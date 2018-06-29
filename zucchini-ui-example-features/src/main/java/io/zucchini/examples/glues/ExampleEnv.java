package io.zucchini.examples.glues;

import cucumber.api.PendingException;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExampleEnv {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExampleEnv.class);

    @Before
    public void logStartOfTest() {
        LOGGER.info("Start");
    }

    @After
    public void logEndOfTest() {
        LOGGER.info("End");
    }

    @Before("@wip")
    public void disableWipTests() {
        throw new PendingException("@wip test");
    }

}
