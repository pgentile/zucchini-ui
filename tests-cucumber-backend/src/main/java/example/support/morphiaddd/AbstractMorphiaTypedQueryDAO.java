package example.support.morphiaddd;

import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import java.util.function.Consumer;

public abstract class AbstractMorphiaTypedQueryDAO<T, K, Q extends MorphiaQuery<T>> extends BasicDAO<T, K> {

    protected AbstractMorphiaTypedQueryDAO(final Class<T> entityClass, final MongoClient mongoClient, final Morphia morphia, final String dbName) {
        super(entityClass, mongoClient, morphia, dbName);
    }

    protected AbstractMorphiaTypedQueryDAO(final Class<T> entityClass, final Datastore ds) {
        super(entityClass, ds);
    }

    protected AbstractMorphiaTypedQueryDAO(final MongoClient mongoClient, final Morphia morphia, final String dbName) {
        super(mongoClient, morphia, dbName);
    }

    protected AbstractMorphiaTypedQueryDAO(final Datastore ds) {
        super(ds);
    }

    public abstract Q createTypedQuery();

    public Query<T> prepareTypedQuery(final Consumer<Q> preparator) {
        final Q typedQuery = createTypedQuery();
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
