package io.testscucumber.backend.support.ddd.morphia;

import io.testscucumber.backend.support.ddd.PreparedQuery;
import io.testscucumber.backend.support.ddd.QueriableRepository;
import org.mongodb.morphia.query.Query;

import java.util.function.Consumer;

public class MorphiaQueriableRepository<T, I, Q> extends MorphiaRepository<T, I> implements QueriableRepository<T, I, Q> {

    private final MorphiaTypedQueryDAO<T, I, ? extends Q> typedQueryDAO;

    public MorphiaQueriableRepository(final MorphiaTypedQueryDAO<T, I, ? extends Q> dao) {
        super(dao);
        typedQueryDAO = dao;
    }

    @Override
    public PreparedQuery<T> query(final Consumer<? super Q> preparator) {
        final Query<T> morphiaQuery = typedQueryDAO.prepareTypedQuery(preparator);
        return new MorphiaPreparedQuery<>(morphiaQuery);
    }

}
