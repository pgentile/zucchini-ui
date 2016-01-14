package io.testscucumber.backend.comment.domainimpl;

import io.testscucumber.backend.comment.domain.CommentGroup;
import io.testscucumber.backend.comment.domain.CommentGroupQuery;
import io.testscucumber.backend.comment.domain.CommentGroupRepository;
import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class CommentGroupRepositoryImpl extends MorphiaQueriableRepository<CommentGroup, String, CommentGroupQuery> implements CommentGroupRepository {

    @Autowired
    public CommentGroupRepositoryImpl(final CommentGroupDAO dao) {
        super(dao);
    }

}
