package io.zucchiniui.backend.support.ddd.morphia;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import java.util.function.Consumer;

public abstract class MorphiaTypedQueryDAO<T, K, Q> extends BasicDAO<T, K> {

    protected MorphiaTypedQueryDAO(final Datastore ds) {
        super(ds);
    }

    public abstract Query<T> prepareTypedQuery(Consumer<? super Q> preparator);

}
