package io.zucchiniui.backend.support.ddd.morphia;

import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.QueriableRepository;
import xyz.morphia.query.Query;

import java.util.function.Consumer;

public class MorphiaQueriableRepository<T, I, Q> extends MorphiaRepository<T, I, MorphiaTypedQueryDAO<T, I, Q>> implements QueriableRepository<T, I, Q> {

    private final MorphiaTypedQueryDAO<T, I, Q> typedQueryDAO;

    public MorphiaQueriableRepository(final MorphiaTypedQueryDAO<T, I, Q> dao) {
        super(dao);
        typedQueryDAO = dao;
    }

    @Override
    public PreparedQuery<T> query(final Consumer<? super Q> preparator) {
        final Query<T> morphiaQuery = typedQueryDAO.prepareTypedQuery(preparator);
        return new MorphiaPreparedQuery<>(typedQueryDAO, morphiaQuery);
    }

}
