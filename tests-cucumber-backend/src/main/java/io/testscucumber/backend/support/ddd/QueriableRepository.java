package io.testscucumber.backend.support.ddd;

import java.util.function.Consumer;

/**
 * Repository that can be queried with a type-safe query
 *
 * @param <T> Entity type
 * @param <I> Entity identifier type
 * @param <Q> Query type
 */
public interface QueriableRepository<T, I, Q> extends Repository<T, I> {

    /**
     * Query the repository.
     *
     * @param preparator Query preparator
     * @return Prepared query, ready to be executed
     */
    PreparedQuery<T> query(Consumer<? super Q> preparator);

}
