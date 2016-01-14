package io.testscucumber.backend.reportconverter.converter;

import com.google.common.base.CharMatcher;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;

class StripAtSignConverter extends CustomConverter<String, String> {

    private static final CharMatcher AT_SIGN_MATCHER = CharMatcher.is('@');

    @Override
    public String convert(final String source, final Type<? extends String> destinationType) {
        if (source == null) {
            return null;
        }
        return AT_SIGN_MATCHER.trimLeadingFrom(source);
    }

}
