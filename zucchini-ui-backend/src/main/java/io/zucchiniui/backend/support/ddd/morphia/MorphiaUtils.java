package io.zucchiniui.backend.support.ddd.morphia;

import xyz.morphia.query.MorphiaIterator;
import xyz.morphia.query.Query;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public final class MorphiaUtils {

    private MorphiaUtils() {

    }

    public static <T> Stream<T> streamQuery(final Query<T> query) {
        final MorphiaIterator<T, T> morphiaIterator = query.fetch();
        return StreamSupport.stream(morphiaIterator.spliterator(), false).onClose(morphiaIterator::close);
    }

}
