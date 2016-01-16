package io.testscucumber.backend.comment.rest;

import io.testscucumber.backend.comment.domain.Comment;
import io.testscucumber.backend.comment.domain.CommentReference;
import io.testscucumber.backend.comment.domain.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.util.List;
import java.util.Set;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CommentResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommentResource.class);

    private final CommentRepository commentRepository;

    private final URI baseUri;

    private final Set<CommentReference> findReferences;

    private final Set<CommentReference> createReferences;

    @Component
    public static class Factory {

        private final CommentRepository commentRepository;

        @Autowired
        public Factory(final CommentRepository commentRepository) {
            this.commentRepository = commentRepository;
        }

        public CommentResource create(
            final URI baseUri,
            final Set<CommentReference> findReferences,
            final Set<CommentReference> createReferences
        ) {
            return new CommentResource(this, baseUri, findReferences, createReferences);
        }

    }

    private CommentResource(
        final Factory factory,
        final URI baseUri,
        final Set<CommentReference> findReferences,
        final Set<CommentReference> createReferences
    ) {
        if (findReferences.isEmpty()) {
            throw new IllegalArgumentException("Find references are not defined");
        }
        if (!createReferences.containsAll(findReferences)) {
            throw new IllegalArgumentException("Create reference " + createReferences + " must contain all find references" + findReferences);
        }

        commentRepository = factory.commentRepository;
        this.baseUri = baseUri;
        this.findReferences = findReferences;
        this.createReferences = createReferences;
    }

    @GET
    public List<Comment> getComments() {
        return commentRepository.query(q -> q.withReferences(findReferences).orderByLatestFirst()).find();
    }

    @GET
    @Path("{commentId}")
    public Comment getComment(@PathParam("commentId") final String commentId) {
        final Comment comment = commentRepository.getById(commentId);
        if (!comment.getReferences().containsAll(findReferences)) {
            throw new NotFoundException("Comment with ID " + commentId + " exists, but is not attached to references " + findReferences);
        }
        return comment;
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateCommentRequest request) {
        LOGGER.info("Create comment with references {}", createReferences);

        final Comment comment = new Comment(createReferences, request.getContent());
        commentRepository.save(comment);

        final URI location = UriBuilder.fromUri(baseUri)
            .path("/comments/{id}")
            .build(comment.getId());

        final CreatedCommentResponse response = new CreatedCommentResponse(comment.getId());
        return Response.created(location).entity(response).build();
    }

}
