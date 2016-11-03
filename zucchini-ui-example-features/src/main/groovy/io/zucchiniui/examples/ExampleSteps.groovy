package io.zucchiniui.examples

import com.google.common.io.Resources
import cucumber.api.DataTable
import cucumber.api.PendingException
import cucumber.api.groovy.FR
import cucumber.api.groovy.Hooks

import static org.assertj.core.api.Assertions.assertThat

this.metaClass.mixin(Hooks)
this.metaClass.mixin(FR)


Soit(~/un contexte initialisé/) { ->

}


Quand(~/j'additionne (-?[0-9]+) et (-?[0-9]+)/) { int a, int b ->
    calcul = a + b
}


Alors(~/j'obtiens (-?[0-9]+)/) { int resultat ->
    currentScenario.write("S'assurer que le calcul renvoie bien ${resultat}")
    assertThat(calcul).isEqualTo(resultat)
}


Alors(~/j'obtiens le tableau suivant:/) { DataTable expectedTable ->
    expectedTable.diff([
        [1, 2, 3],
        [4, 5, 6]
    ])
}


Soit(~/une tâche en attente/) { ->
    throw new PendingException()
}


Quand(~/j'affiche l'image de Grumpy Cat/) { ->
    byte[] data = Resources.toByteArray(Resources.getResource("attachments/grumpy-cat.jpg"))
    currentScenario.embed(data, "image/jpeg")
}


Alors(~/je suis de mauvaise humeur/) { ->

}
