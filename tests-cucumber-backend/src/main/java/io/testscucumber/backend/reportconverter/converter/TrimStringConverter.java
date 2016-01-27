package io.testscucumber.backend.reportconverter.converter;

import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;

class TrimStringConverter extends CustomConverter<String, String> {

    @Override
    public String convert(final String source, final Type<? extends String> destinationType) {
        return ConversionUtils.trimString(source);
    }

}
