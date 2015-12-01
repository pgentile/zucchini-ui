package example

import cucumber.api.PendingException
import cucumber.api.groovy.Hooks

this.metaClass.mixin(Hooks)
this.metaClass.mixin(Logging)


Before {
    info("Start")
}


Before("@wip") {
    throw new PendingException("@wip test");
}


After {
    info("End")
}
