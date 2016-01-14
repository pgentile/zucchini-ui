package io.testscucumber.backend.comment.rest;

import io.testscucumber.backend.comment.domain.Comment;
import io.testscucumber.backend.comment.domain.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.util.List;

@Component
@Path("/comments")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CommentResource {

    private final CommentService commentService;

    @Autowired
    public CommentResource(final CommentService commentService) {
        this.commentService = commentService;
    }

    @GET
    public List<Comment> getComments(@Valid @NotNull @BeanParam final GetCommentsRequestParams params) {
        return commentService.getCommentsByTypeAndReferenceId(params.getType(), params.getReferenceId());
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateCommentRequest request) {
        final Comment comment = commentService.addComment(request.getType(), request.getReferenceId(), request.getContent());

        final URI location = UriBuilder.fromPath("/comments/{id}")
            .build(comment.getId());

        final CreatedCommentResponse response = new CreatedCommentResponse(comment.getId());
        return Response.created(location).entity(response).build();
    }

}
