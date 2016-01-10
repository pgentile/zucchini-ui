package example.support.morphiaddd;

import example.support.ddd.ObjectNotFoundException;
import example.support.ddd.TypedQuery;
import org.mongodb.morphia.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public abstract class AbstractMorphiaQuery<T> implements TypedQuery<T>, MorphiaQuery<T> {

    private Query<T> query;

    protected AbstractMorphiaQuery(final Query<T> query) {
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
    public Query<T> morphiaQuery() {
        return query;
    }

    protected void configureQuery(final Function<Query<T>, Query<T>> transform) {
        query = transform.apply(query);
    }

}
