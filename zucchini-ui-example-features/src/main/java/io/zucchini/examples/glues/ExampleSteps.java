package io.zucchini.examples.glues;

import com.google.common.collect.Lists;
import cucumber.api.DataTable;
import cucumber.api.PendingException;
import cucumber.api.java.fr.Alors;
import cucumber.api.java.fr.Soit;

public class ExampleSteps {

    @Soit("un contexte initialisé")
    public void initializedContext() {

    }

    @Soit("une tâche en attente")
    public void pendingTask() {
        throw new PendingException();
    }

    @Alors("j'obtiens le tableau suivant:")
    public void assertTable(DataTable expectedTable) {
        expectedTable.diff(Lists.newArrayList(
            Lists.newArrayList(1, 2, 3),
            Lists.newArrayList(4, 5, 6)
        ));
    }

}
