package io.testscucumber.backend.support.ddd;

import java.util.List;
import java.util.Optional;

public interface PreparedQuery<T> {

    List<T> find();

    T findOne();

    Optional<T> tryToFindOne();

}
