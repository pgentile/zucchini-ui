package example.support.morphiaddd;

import org.mongodb.morphia.query.Query;

public interface MorphiaQuery<T> {

    Query<T> morphiaQuery();

}
