package io.zucchiniui.examples

import cucumber.api.PendingException
import cucumber.api.Scenario
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
    currentScenario.embed(new File("D:/Users/antoine_choimet/Desktop/751d217e8d5c44694502ef3db553b603 (1).jpg").getBytes(), "image/jpg")
}


Before { Scenario scenario ->
    currentScenario = scenario
}
