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
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;

@Component
@Path("/comments")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CommentResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommentResource.class);

    private final CommentRepository commentRepository;

    private UriInfo uriInfo;

    @Autowired
    public CommentResource(final CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Context
    public void setUriInfo(final UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    @GET
    public List<Comment> getComments(@Valid @NotNull @BeanParam final GetCommentsRequestParams params) {
        final CommentReference commentReference = new CommentReference(params.getReferenceType(), params.getReference());
        return commentRepository.query(q -> q.withReference(commentReference)).find();
    }

    @GET
    @Path("{commentId}")
    public Comment getComment(@PathParam("commentId") final String commentId) {
        return commentRepository.getById(commentId);
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateCommentRequest request) {
        LOGGER.info("Create comment with references {}", request.getReferences());

        final Comment comment = new Comment(request.getReferences(), request.getContent());
        commentRepository.save(comment);

        final URI location = uriInfo.getBaseUriBuilder()
            .path("/comments/{id}")
            .build(comment.getId());

        final CreatedCommentResponse response = new CreatedCommentResponse(comment.getId());
        return Response.created(location).entity(response).build();
    }

}
