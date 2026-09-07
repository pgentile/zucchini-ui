package io.zucchiniui.backend.support.ddd.morphia;

import dev.morphia.DeleteOptions;
import dev.morphia.query.Query;
import io.zucchiniui.backend.support.ddd.EntityNotFoundException;
import io.zucchiniui.backend.support.ddd.PreparedQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Stream;

class MorphiaPreparedQuery<T> implements PreparedQuery<T> {

    private final MorphiaDAO<T, ?> dao;

    private final Query<T> query;

    public MorphiaPreparedQuery(final MorphiaDAO<T, ?> dao, final Query<T> query) {
        this.dao = dao;
        this.query = query;
    }

    @Override
    public List<T> find() {
        try (Stream<T> s = stream()) {
            return s.toList();
        }
    }

    @Override
    public Stream<T> stream() {
        return MorphiaUtils.streamQuery(query);
    }

    @Override
    public T findOne() {
        final T entity = query.first();
        if (entity == null) {
            throw new EntityNotFoundException(query.getEntityClass(), "Not found by query " + this);
        }
        return entity;
    }

    @Override
    public Optional<T> tryToFindOne() {
        final T entity = query.first();
        return Optional.ofNullable(entity);
    }

    @Override
    public void update(final Consumer<T> updater) {
        try (final Stream<T> s = stream()) {
            s.peek(updater).forEach(dao::save);
        }
    }

    @Override
    public void delete() {
        query.delete(new DeleteOptions().multi(true));
    }

}
