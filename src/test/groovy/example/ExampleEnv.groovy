package example

import cucumber.api.PendingException
import cucumber.api.Scenario
import cucumber.api.groovy.Hooks

import java.nio.charset.StandardCharsets

this.metaClass.mixin(Hooks)
this.metaClass.mixin(Logging)


World {
    return new Object() {

        List<String> logs = [];

    }
}

Before { Scenario scenario ->
    info("Start")

    logs.add("Debut 1")
    logs.add("Debut 2")
    logs.add("Debut 3")

    scenario.write("START")
}


Before("@wip") {
    throw new PendingException("@wip test");
}


After { Scenario scenario ->
    scenario.write("END")


    info("End")

    scenario.embed("Titi".getBytes(StandardCharsets.UTF_8), "text/plain")
    scenario.write("Hello, mon coco !")

    logs.each { scenario.write("Log : ${it}") }
}
