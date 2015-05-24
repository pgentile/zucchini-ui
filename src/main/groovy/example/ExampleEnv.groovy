package example

import cucumber.api.groovy.Hooks


this.metaClass.mixin(Hooks)
this.metaClass.mixin(Logging)


Before {
    def name = "Pierre"
    info("Salut, ${name}")
}
