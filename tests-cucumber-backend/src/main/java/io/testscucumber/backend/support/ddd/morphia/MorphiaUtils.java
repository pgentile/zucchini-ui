package io.testscucumber.backend.support.ddd.morphia;

import org.mongodb.morphia.query.MorphiaIterator;
import org.mongodb.morphia.query.Query;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public final class MorphiaUtils {

    private MorphiaUtils() {

    }

    public static <T> Stream<T> streamQuery(final Query<T> query) {
        final MorphiaIterator<T, T> morphiaIterator = query.fetch();
        return StreamSupport.stream(morphiaIterator.spliterator(), false);
    }

}
