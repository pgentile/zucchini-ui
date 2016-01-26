package io.testscucumber.backend.support.ddd.morphia;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import io.testscucumber.backend.support.ddd.EntityNotFoundException;
import io.testscucumber.backend.support.ddd.RefreshableEntityRepository;
import io.testscucumber.backend.support.ddd.Repository;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.mapping.Mapper;
import org.mongodb.morphia.mapping.cache.EntityCache;

public class MorphiaRepository<T, I> implements Repository<T, I>, RefreshableEntityRepository<T, I> {

    private final BasicDAO<T, I> dao;

    public MorphiaRepository(final BasicDAO<T, I> dao) {
        this.dao = dao;
    }

    @Override
    public T getById(final I id) {
        final T entity = dao.get(id);
        if (entity == null) {
            throw new EntityNotFoundException(dao.getEntityClass(), "Not found for ID " + id);
        }
        return entity;
    }

    @Override
    public void save(final T entity) {
        dao.save(entity);
    }

    @Override
    public void delete(final T entity) {
        dao.delete(entity);
    }

    @Override
    public void refresh(final T entity) {
        final Mapper mapper = dao.getDs().getMapper();

        final Object id = mapper.getKey(entity).getId();
        final DBObject query = new BasicDBObject(Mapper.ID_KEY, id);
        final DBObject dbObj = dao.getCollection().findOne(query);
        if (dbObj == null) {
            throw new EntityNotFoundException(dao.getEntityClass(), "Not found for ID " + id);
        }

        final EntityCache entityCache = mapper.createEntityCache();
        mapper.fromDb(dao.getDatastore(), dbObj, entity, entityCache);
    }

}
