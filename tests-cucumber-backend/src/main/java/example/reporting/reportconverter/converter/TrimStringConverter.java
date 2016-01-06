package example.reporting.reportconverter.converter;

import com.google.common.base.CharMatcher;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;

class TrimStringConverter extends CustomConverter<String, String> {

    @Override
    public String convert(final String source, final Type<? extends String> destinationType) {
        if (source == null) {
            return null;
        }

        return CharMatcher.WHITESPACE.trimFrom(source);
    }

}
