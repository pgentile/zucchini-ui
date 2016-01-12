package example.support.restddd;

import example.support.ddd.EntityNotFoundException;
import io.dropwizard.jersey.errors.ErrorMessage;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class EntityNotFoundExceptionMapper implements ExceptionMapper<EntityNotFoundException> {

    @Override
    public Response toResponse(EntityNotFoundException exception) {
        final Response.Status status = Response.Status.NOT_FOUND;
        final ErrorMessage errorMessage = new ErrorMessage(status.getStatusCode(), exception.getMessage());
        return Response.status(status).entity(errorMessage).build();
    }
}
