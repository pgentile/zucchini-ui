package io.zucchiniui.backend.support.ddd.morphia;

import org.mongodb.morphia.query.Query;

import java.util.function.Function;

public class BaseMorphiaQuery<T> {

    private Query<T> query;

    protected BaseMorphiaQuery(final Query<T> query) {
        this.query = query;
    }

    public Query<T> morphiaQuery() {
        return query;
    }

    protected void configureQuery(final Function<Query<T>, Query<T>> transform) {
        query = transform.apply(query);
    }

    @Override
    public String toString() {
        return query.toString();
    }

}
