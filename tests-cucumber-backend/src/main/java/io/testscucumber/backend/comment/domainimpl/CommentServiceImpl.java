package io.testscucumber.backend.comment.domainimpl;

import io.testscucumber.backend.comment.domain.Comment;
import io.testscucumber.backend.comment.domain.CommentGroup;
import io.testscucumber.backend.comment.domain.CommentGroupRepository;
import io.testscucumber.backend.comment.domain.CommentRepository;
import io.testscucumber.backend.comment.domain.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
class CommentServiceImpl implements CommentService {

    private final CommentGroupRepository commentGroupRepository;

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(final CommentGroupRepository commentGroupRepository, final CommentRepository commentRepository) {
        this.commentGroupRepository = commentGroupRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment addComment(final String type, final String referenceId, final String content) {
        final Optional<CommentGroup> existingCommentGroup = commentGroupRepository.query(q -> {
            q.withType(type).withReferenceId(referenceId);
        }).tryToFindOne();

        final CommentGroup commentGroup = existingCommentGroup.orElseGet(() -> {
            final CommentGroup newCommentGroup = new CommentGroup(type, referenceId);
            commentGroupRepository.save(newCommentGroup);
            return newCommentGroup;
        });

        final Comment comment = new Comment(commentGroup.getId(), content);
        commentRepository.save(comment);

        return comment;
    }

    @Override
    public List<Comment> getCommentsByTypeAndReferenceId(final String type, final String referenceId) {
        final CommentGroup commentGroup = commentGroupRepository.query(q -> {
            q.withType(type).withReferenceId(referenceId);
        }).findOne();

        return commentRepository.query(q -> q.withGroupId(commentGroup.getId()).orderByLatestFirst()).find();
    }

}
