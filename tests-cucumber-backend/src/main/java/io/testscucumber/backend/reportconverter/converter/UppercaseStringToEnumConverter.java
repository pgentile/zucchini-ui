package io.testscucumber.backend.reportconverter.converter;

import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;

import java.util.Locale;

class UppercaseStringToEnumConverter extends CustomConverter<String, Enum<?>> {

    @Override
    @SuppressWarnings("unchecked")
    public Enum<?> convert(final String source, final Type<? extends Enum<?>> destinationType) {
        if (source == null) {
            return null;
        }

        final String uppercaseValue = source.toUpperCase(Locale.ENGLISH);
        return Enum.valueOf((Class) destinationType.getRawType(), uppercaseValue);
    }

}
