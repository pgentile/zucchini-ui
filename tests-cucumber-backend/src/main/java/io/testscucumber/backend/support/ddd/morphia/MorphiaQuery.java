package io.testscucumber.backend.support.ddd.morphia;

import org.mongodb.morphia.query.Query;

public interface MorphiaQuery<T> {

    Query<T> morphiaQuery();

}
