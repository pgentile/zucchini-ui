package example.support.morphiaddd;

import org.mongodb.morphia.query.Query;

import java.util.function.Function;

public abstract class AbstractMorphiaQuery<T> implements MorphiaQuery<T> {

    private Query<T> query;

    protected AbstractMorphiaQuery(final Query<T> query) {
        this.query = query;
    }

    @Override
    public Query<T> morphiaQuery() {
        return query;
    }

    protected void configureQuery(final Function<Query<T>, Query<T>> transform) {
        query = transform.apply(query);
    }

}
