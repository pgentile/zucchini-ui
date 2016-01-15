package io.testscucumber.backend.support.ddd;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface PreparedQuery<T> extends Iterable<T> {

    List<T> find();

    Stream<T> stream();

    T findOne();

    Optional<T> tryToFindOne();

}
