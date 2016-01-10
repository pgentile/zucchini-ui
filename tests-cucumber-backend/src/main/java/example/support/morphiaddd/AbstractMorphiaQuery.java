package example.support.morphiaddd;

import example.support.ddd.ObjectNotFoundException;
import example.support.ddd.Query;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public abstract class AbstractMorphiaQuery<T> implements Query<T>, MorphiaQuery<T> {

    private org.mongodb.morphia.query.Query<T> query;

    protected AbstractMorphiaQuery(final org.mongodb.morphia.query.Query<T> query) {
        this.query = query;
    }

    @Override
    public List<T> find() {
        return query.asList();
    }

    @Override
    public T findOne() {
        final T entity = query.get();
        if (entity == null) {
            throw new ObjectNotFoundException(query.getEntityClass(), "Not found by query " + this);
        }
        return entity;
    }

    @Override
    public Optional<T> tryToFindOne() {
        final T entity = query.get();
        return Optional.ofNullable(entity);
    }

    @Override
    public org.mongodb.morphia.query.Query<T> morphiaQuery() {
        return query;
    }

    protected void configureQuery(final Function<org.mongodb.morphia.query.Query<T>, org.mongodb.morphia.query.Query<T>> transform) {
        query = transform.apply(query);
    }

}
