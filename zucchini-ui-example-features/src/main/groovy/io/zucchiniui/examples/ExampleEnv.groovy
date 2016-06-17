package io.zucchiniui.examples

import cucumber.api.PendingException
import cucumber.api.groovy.Hooks
import org.slf4j.LoggerFactory

this.metaClass.mixin(Hooks)

final LOGGER = LoggerFactory.getLogger(getClass())

Before {
    LOGGER.info("Start")
}


Before("@wip") {
    throw new PendingException("@wip test");
}


After {
    LOGGER.info("End")
}
