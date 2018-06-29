package io.zucchini.examples.glues;

import com.google.common.io.Resources;
import cucumber.api.Scenario;
import cucumber.api.java.Before;
import cucumber.api.java.fr.Alors;
import cucumber.api.java.fr.Quand;

public class GrumpyCatSteps {

    private Scenario scenario;

    @Before
    public void setScenario(Scenario scenario) {
        this.scenario = scenario;
    }

    @Quand("j'affiche l'image de Grumpy Cat")
    public void displayGrumpyCat() throws Exception {
        byte[] data = Resources.toByteArray(Resources.getResource("attachments/grumpy-cat.jpg"));
        scenario.embed(data, "image/jpeg");
    }

    @Alors("je suis de mauvaise humeur")
    public void assertBadMood() {

    }

}
