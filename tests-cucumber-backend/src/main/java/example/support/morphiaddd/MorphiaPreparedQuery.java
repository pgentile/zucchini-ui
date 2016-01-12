package example.support.morphiaddd;

import example.support.ddd.ObjectNotFoundException;
import example.support.ddd.PreparedQuery;
import org.mongodb.morphia.query.Query;

import java.util.List;
import java.util.Optional;

class MorphiaPreparedQuery<T> implements PreparedQuery<T> {

    private final Query<T> query;

    public MorphiaPreparedQuery(final Query<T> query) {
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

}
