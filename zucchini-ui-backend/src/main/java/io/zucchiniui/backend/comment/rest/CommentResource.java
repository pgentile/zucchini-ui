package io.zucchiniui.backend.comment.rest;

import io.dropwizard.jersey.PATCH;
import io.zucchiniui.backend.comment.domain.Comment;
import io.zucchiniui.backend.comment.domain.CommentRepository;
import io.zucchiniui.backend.shared.domain.ItemReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CommentResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommentResource.class);

    private final CommentRepository commentRepository;

    private final URI baseUri;

    private final Set<ItemReference> mainReferences;

    private final Set<ItemReference> extraReferences;

    @Component
    public static class Factory {

        private final CommentRepository commentRepository;

        public Factory(final CommentRepository commentRepository) {
            this.commentRepository = commentRepository;
        }

        public CommentResource create(
            final URI baseUri,
            final Set<ItemReference> findReferences,
            final Set<ItemReference> createReferences
        ) {
            return new CommentResource(this, baseUri, findReferences, createReferences);
        }

    }

    private CommentResource(
        final Factory factory,
        final URI baseUri,
        final Set<ItemReference> mainReferences,
        final Set<ItemReference> extraReferences
    ) {
        if (mainReferences.isEmpty()) {
            throw new IllegalArgumentException("Find references are not defined");
        }

        commentRepository = factory.commentRepository;
        this.baseUri = baseUri;
        this.mainReferences = mainReferences;
        this.extraReferences = extraReferences;
    }

    @GET
    public List<Comment> getComments() {
        return commentRepository.queryByReferences(mainReferences).find();
    }

    @GET
    @Path("{commentId}")
    public Comment getComment(@PathParam("commentId") final String commentId) {
        return loadCommentById(commentId);
    }

    @PATCH
    @Path("{commentId}")
    public void updateComment(@PathParam("commentId") final String commentId, @Valid @NotNull final UpdateCommentRequest request) {
        final Comment comment = loadCommentById(commentId);
        comment.setContent(request.getContent());
        commentRepository.save(comment);
    }

    @DELETE
    @Path("{commentId}")
    public void delete(@PathParam("commentId") final String commentId) {
        final Comment comment = loadCommentById(commentId);
        commentRepository.delete(comment);
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateCommentRequest request) {
        final Set<ItemReference> references = new HashSet<>();
        references.addAll(mainReferences);
        references.addAll(extraReferences);

        LOGGER.info("Create comment with references {}", references);

        final Comment comment = new Comment(references, request.getContent());
        commentRepository.save(comment);

        final URI location = UriBuilder.fromUri(baseUri)
            .path("/{commentId}")
            .build(comment.getId());

        final CreatedCommentResponse response = new CreatedCommentResponse(comment.getId());
        return Response.created(location).entity(response).build();
    }

    private Comment loadCommentById(final String commentId) {
        final Comment comment = commentRepository.getById(commentId);
        if (!comment.getReferences().containsAll(mainReferences)) {
            throw new NotFoundException("Comment with ID " + comment.getId() + " exists, but is not attached to references " + mainReferences);
        }
        return comment;
    }

}
