package io.zucchiniui.backend.support.morphia;

import org.bson.BsonReader;
import org.bson.BsonWriter;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * Codec provider for JDK Date Time objects with timezone info : {@link ZonedDateTime} and {@link OffsetDateTime}.
 * <p>
 * Values are stored as UTC epoch millis (BSON date type), and are decoded back using the system default time zone,
 * mirroring the behavior of the previous Morphia 1.x {@code ZonedDateTimeConverter}.
 *
 * @author pgentile
 */
public class DateTimeCodecProvider implements CodecProvider {

    @Override
    @SuppressWarnings("unchecked")
    public <T> Codec<T> get(final Class<T> clazz, final CodecRegistry registry) {
        if (clazz == ZonedDateTime.class) {
            return (Codec<T>) new ZonedDateTimeCodec();
        }
        if (clazz == OffsetDateTime.class) {
            return (Codec<T>) new OffsetDateTimeCodec();
        }
        return null;
    }

    static class ZonedDateTimeCodec implements Codec<ZonedDateTime> {

        @Override
        public void encode(final BsonWriter writer, final ZonedDateTime value, final EncoderContext encoderContext) {
            writer.writeDateTime(value.toInstant().toEpochMilli());
        }

        @Override
        public ZonedDateTime decode(final BsonReader reader, final DecoderContext decoderContext) {
            return ZonedDateTime.ofInstant(Instant.ofEpochMilli(reader.readDateTime()), ZoneId.systemDefault());
        }

        @Override
        public Class<ZonedDateTime> getEncoderClass() {
            return ZonedDateTime.class;
        }

    }

    static class OffsetDateTimeCodec implements Codec<OffsetDateTime> {

        @Override
        public void encode(final BsonWriter writer, final OffsetDateTime value, final EncoderContext encoderContext) {
            writer.writeDateTime(value.toInstant().toEpochMilli());
        }

        @Override
        public OffsetDateTime decode(final BsonReader reader, final DecoderContext decoderContext) {
            return OffsetDateTime.ofInstant(Instant.ofEpochMilli(reader.readDateTime()), ZoneId.systemDefault());
        }

        @Override
        public Class<OffsetDateTime> getEncoderClass() {
            return OffsetDateTime.class;
        }

    }

}
