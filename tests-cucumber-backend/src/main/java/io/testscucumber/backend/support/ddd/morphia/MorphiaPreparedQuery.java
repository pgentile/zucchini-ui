package io.testscucumber.backend.support.ddd.morphia;

import io.testscucumber.backend.support.ddd.EntityNotFoundException;
import io.testscucumber.backend.support.ddd.PreparedQuery;
import org.mongodb.morphia.dao.DAO;
import org.mongodb.morphia.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

class MorphiaPreparedQuery<T> implements PreparedQuery<T> {

    private final DAO<T, ?> dao;

    private final Query<T> query;

    public MorphiaPreparedQuery(final DAO<T, ?> dao, final Query<T> query) {
        this.dao = dao;
        this.query = query;
    }

    @Override
    public List<T> find() {
        return query.asList();
    }

    @Override
    public Stream<T> stream() {
        return MorphiaUtils.streamQuery(query);
    }

    @Override
    public T findOne() {
        final T entity = query.get();
        if (entity == null) {
            throw new EntityNotFoundException(query.getEntityClass(), "Not found by query " + this);
        }
        return entity;
    }

    @Override
    public Optional<T> tryToFindOne() {
        final T entity = query.get();
        return Optional.ofNullable(entity);
    }

    @Override
    public void delete() {
        dao.deleteByQuery(query);
    }

}
