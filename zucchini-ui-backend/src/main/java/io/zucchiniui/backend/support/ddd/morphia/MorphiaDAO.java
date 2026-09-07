package io.zucchiniui.backend.support.ddd.morphia;

import dev.morphia.Datastore;
import dev.morphia.query.Query;
import dev.morphia.query.filters.Filters;

/**
 * Base class for Morphia-backed DAOs, replacing the {@code xyz.morphia.dao.BasicDAO} class removed in modern Morphia
 * versions.
 *
 * @param <T> Entity type
 * @param <I> Entity identifier type
 */
public abstract class MorphiaDAO<T, I> {

    protected final Datastore datastore;

    private final Class<T> entityClass;

    protected MorphiaDAO(final Datastore datastore, final Class<T> entityClass) {
        this.datastore = datastore;
        this.entityClass = entityClass;
    }

    public Class<T> getEntityClass() {
        return entityClass;
    }

    public T get(final I id) {
        return createQuery().filter(Filters.eq("_id", id)).first();
    }

    public void save(final T entity) {
        datastore.save(entity);
    }

    public void delete(final T entity) {
        datastore.delete(entity);
    }

    protected Query<T> createQuery() {
        return datastore.find(entityClass);
    }

}
