package io.zucchiniui.backend.support.ddd.morphia;

import io.zucchiniui.backend.support.ddd.ConcurrentEntityModificationException;
import io.zucchiniui.backend.support.ddd.EntityNotFoundException;
import io.zucchiniui.backend.support.ddd.Repository;
import org.mongodb.morphia.dao.BasicDAO;

import java.util.ConcurrentModificationException;

public class MorphiaRepository<T, I> implements Repository<T, I> {

    private final BasicDAO<T, I> dao;

    public MorphiaRepository(final BasicDAO<T, I> dao) {
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

}
