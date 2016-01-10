package example.support.morphiaddd;

import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import java.util.function.Consumer;

public abstract class AbstractMorphiaTypedQueryDAO<T, K, Q extends MorphiaQuery<T>> extends BasicDAO<T, K> {

    public AbstractMorphiaTypedQueryDAO(Class<T> entityClass, MongoClient mongoClient, Morphia morphia, String dbName) {
        super(entityClass, mongoClient, morphia, dbName);
    }

    public AbstractMorphiaTypedQueryDAO(Class<T> entityClass, Datastore ds) {
        super(entityClass, ds);
    }

    public AbstractMorphiaTypedQueryDAO(MongoClient mongoClient, Morphia morphia, String dbName) {
        super(mongoClient, morphia, dbName);
    }

    public AbstractMorphiaTypedQueryDAO(Datastore ds) {
        super(ds);
    }

    public abstract Q createTypedQuery();

    public Query<T> prepareTypedQuery(Consumer<Q> preparator) {
        Q typedQuery = createTypedQuery();
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
