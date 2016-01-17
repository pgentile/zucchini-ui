package io.testscucumber.backend.support.ddd;

/**
 * Base implementation of a DDD repository.
 *
 * @param <T> Entity type
 * @param <I> Entity identifier type
 */
public interface Repository<T, I> {

    /**
     * Get entity by ID.
     *
     * @param id Identifier
     * @return Found entity
     * @throws EntityNotFoundException Entity not found in repository
     */
    T getById(I id);

    /**
     * Save a new or existing entity in repository.
     *
     * @param entity Entity to save
     */
    void save(T entity);

    /**
     * Delete an entity.
     *
     * @param entity Entity to delete
     */
    void delete(T entity);

}
