package example.support.morphia;

import org.mongodb.morphia.converters.SimpleValueConverter;
import org.mongodb.morphia.converters.TypeConverter;
import org.mongodb.morphia.mapping.MappedField;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

/**
 * Morphia converter for JDK Date Time objects with timezone info : {@link ZonedDateTime} and {@link OffsetDateTime}.
 *
 * @author pgentile
 */
public class ZonedDateTimeConverter extends TypeConverter implements SimpleValueConverter {

    public ZonedDateTimeConverter() {
        super(ZonedDateTime.class, OffsetDateTime.class);
    }

    @Override
    public Object decode(final Class<?> targetClass, final Object fromDBObject, final MappedField optionalExtraInfo) {
        if (fromDBObject == null) {
            return null;
        }

        if (targetClass == ZonedDateTime.class) {
            if (fromDBObject instanceof Date) {
                return ZonedDateTime.ofInstant(((Date) fromDBObject).toInstant(), ZoneId.systemDefault());
            }
            if (fromDBObject instanceof Number) {
                return ZonedDateTime.ofInstant(Instant.ofEpochMilli(((Number) fromDBObject).longValue()), ZoneId.systemDefault());
            }
        }

        if (targetClass == OffsetDateTime.class) {
            if (fromDBObject instanceof Date) {
                return OffsetDateTime.ofInstant(((Date) fromDBObject).toInstant(), ZoneId.systemDefault());
            }
            if (fromDBObject instanceof Number) {
                return OffsetDateTime.ofInstant(Instant.ofEpochMilli(((Number) fromDBObject).longValue()), ZoneId.systemDefault());
            }
        }

        throw createUnsupportedTypeException("Decode", fromDBObject);
    }

    @Override
    public Object encode(final Object value, final MappedField optionalExtraInfo) {
        if (value == null) {
            return null;
        }

        if (value instanceof ZonedDateTime) {
            return Date.from(((ZonedDateTime) value).toInstant());
        }
        if (value instanceof OffsetDateTime) {
            return Date.from(((OffsetDateTime) value).toInstant());
        }
        throw createUnsupportedTypeException("Encode", value);
    }

    private static IllegalArgumentException createUnsupportedTypeException(final String context, final Object value) {
        return new IllegalArgumentException(context + ": unsupported type " + value.getClass() + " for value " + value);
    }

}
