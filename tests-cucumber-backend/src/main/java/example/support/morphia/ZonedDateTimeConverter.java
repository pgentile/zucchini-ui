package example.support.morphia;

import org.mongodb.morphia.converters.SimpleValueConverter;
import org.mongodb.morphia.converters.TypeConverter;
import org.mongodb.morphia.mapping.MappedField;

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
    public Object decode(Class<?> targetClass, Object fromDBObject, MappedField optionalExtraInfo) {
        if (fromDBObject == null) {
            return null;
        }

        if (targetClass == ZonedDateTime.class) {
            if (fromDBObject instanceof Date) {
                return ZonedDateTime.ofInstant(((Date) fromDBObject).toInstant(), ZoneId.systemDefault());
            }
        }

        if (targetClass == OffsetDateTime.class) {
            if (fromDBObject instanceof Date) {
                return OffsetDateTime.ofInstant(((Date) fromDBObject).toInstant(), ZoneId.systemDefault());
            }
        }

        throw createUnsupportedTypeException("Decode", fromDBObject);
    }

    @Override
    public Object encode(Object value, MappedField optionalExtraInfo) {
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

    private static IllegalArgumentException createUnsupportedTypeException(String context, Object value) {
        return new IllegalArgumentException(context + ": unsupported type " + value.getClass() + " for value " + value);
    }

}
