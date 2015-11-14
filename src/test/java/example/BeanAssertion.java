package example;

import org.assertj.core.api.AbstractAssert;

public final class BeanAssertion extends AbstractAssert<BeanAssertion, String> {

    private BeanAssertion(final String actual) {
        super(actual, BeanAssertion.class);
    }

    public static BeanAssertion assertThat(final String actual) {
        return new BeanAssertion(actual);
    }

}
