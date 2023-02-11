package io.zucchiniui.backend.support.ddd.morphia;

import io.zucchiniui.backend.support.ddd.ConcurrentEntityModificationException;
import io.zucchiniui.backend.support.ddd.EntityNotFoundException;
import io.zucchiniui.backend.support.ddd.Repository;
import xyz.morphia.dao.BasicDAO;
import xyz.morphia.query.Query;

import java.util.ConcurrentModificationException;
import java.util.function.Function;

public class MorphiaRepository<T, I, D extends BasicDAO<T, I>> implements Repository<T, I> {

    private final D dao;

    public MorphiaRepository(final D dao) {
        this.dao = dao;
    }

    @Override
    public T getById(final I id) {
        final T entity = dao.get(id);
        if (entity == null) {
            throw new EntityNotFoundException(dao.getEntityClass(), "Not found for ID " + id);
        }
        return entity;
    }

    @Override
    public void save(final T entity) {
        try {
            dao.save(entity);
        } catch (final ConcurrentModificationException e) {
            throw new ConcurrentEntityModificationException(dao.getEntityClass(), "Concurrent modification for " + entity, e);
        }
    }

    @Override
    public void delete(final T entity) {
        dao.delete(entity);
    }

    protected MorphiaPreparedQuery<T> prepareQuery(Function<D, Query<T>> queryPreparator) {
        return new MorphiaPreparedQuery<>(dao, queryPreparator.apply(dao));
    }

}
