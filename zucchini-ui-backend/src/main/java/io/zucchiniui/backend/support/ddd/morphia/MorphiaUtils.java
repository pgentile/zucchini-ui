package io.zucchiniui.backend.support.ddd.morphia;

import dev.morphia.query.MorphiaCursor;
import dev.morphia.query.Query;

import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public final class MorphiaUtils {

    private MorphiaUtils() {

    }

    public static <T> Stream<T> streamQuery(final Query<T> query) {
        final MorphiaCursor<T> cursor = query.iterator();
        return StreamSupport.stream(Spliterators.spliteratorUnknownSize(cursor, Spliterator.ORDERED), false)
            .onClose(cursor::close);
    }

}
