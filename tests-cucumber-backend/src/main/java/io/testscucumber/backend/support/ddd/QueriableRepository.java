package io.testscucumber.backend.support.ddd;

import java.util.function.Consumer;

public interface QueriableRepository<T, I, Q> extends Repository<T, I> {

    PreparedQuery<T> query(Consumer<? super Q> preparator);

}
