package example.support.ddd.morphia;

import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import java.util.function.Consumer;

public abstract class MorphiaTypedQueryDAO<T, K, Q extends MorphiaQuery<T>> extends BasicDAO<T, K> {

    protected MorphiaTypedQueryDAO(final Class<T> entityClass, final MongoClient mongoClient, final Morphia morphia, final String dbName) {
        super(entityClass, mongoClient, morphia, dbName);
    }

    protected MorphiaTypedQueryDAO(final Class<T> entityClass, final Datastore ds) {
        super(entityClass, ds);
    }

    protected MorphiaTypedQueryDAO(final MongoClient mongoClient, final Morphia morphia, final String dbName) {
        super(mongoClient, morphia, dbName);
    }

    protected MorphiaTypedQueryDAO(final Datastore ds) {
        super(ds);
    }

    public Query<T> prepareTypedQuery(final Consumer<? super Q> preparator) {
        final Q typedQuery = createTypedQuery();
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

    protected abstract Q createTypedQuery();

}
