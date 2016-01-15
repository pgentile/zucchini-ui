package io.testscucumber.backend.support.ddd.morphia;

import io.testscucumber.backend.support.ddd.EntityNotFoundException;
import io.testscucumber.backend.support.ddd.PreparedQuery;
import org.mongodb.morphia.query.Query;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

class MorphiaPreparedQuery<T> implements PreparedQuery<T> {

    private final Query<T> query;

    public MorphiaPreparedQuery(final Query<T> query) {
        this.query = query;
    }

    @Override
    public Iterator<T> iterator() {
        return query.iterator();
    }

    @Override
    public List<T> find() {
        return query.asList();
    }

    @Override
    public Stream<T> stream() {
        return StreamSupport.stream(spliterator(), false);
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

}
