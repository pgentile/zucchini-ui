package io.zucchini.examples.glues;

import cucumber.api.java.fr.Alors;
import cucumber.api.java.fr.Quand;

import static org.assertj.core.api.Assertions.assertThat;

public class AdditionSteps {

    private Integer calcul;

    @Quand("j'additionne (-?[0-9]+) et (-?[0-9]+)")
    public void addTwoNumbers(int a, int b) {
        assertThat(calcul).isNull();
        calcul = a + b;
    }

    @Alors("j'obtiens (-?[0-9]+)")
    public void assertCalcul(int expectedResult) {
        assertThat(calcul).isEqualTo(expectedResult);
    }

}
