package example.support.morphiaddd;

public interface MorphiaQuery<T> {

    org.mongodb.morphia.query.Query<T> morphiaQuery();

}
