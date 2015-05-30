package example;

import org.assertj.core.api.AbstractAssert;

public class BeanAssertion extends AbstractAssert<BeanAssertion, String> {

    private BeanAssertion(String actual) {
        super(actual, BeanAssertion.class);
    }

    public static BeanAssertion assertThat(String actual) {
        return new BeanAssertion(actual);
    }

}
