package io.testscucumber.backend.support.ddd;

public interface RefreshableEntityRepository<T, I> extends Repository<T, I> {

    /**
     * Refresh an existing entity from underling data source.
     *
     * @param entity Entity to refresh
     */
    void refresh(T entity);

}
