package example.support.restddd;

import example.support.ddd.ObjectNotFoundException;
import io.dropwizard.jersey.errors.ErrorMessage;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ObjectNotFoundExceptionMapper implements ExceptionMapper<ObjectNotFoundException> {

    @Override
    public Response toResponse(ObjectNotFoundException exception) {
        final Response.Status status = Response.Status.NOT_FOUND;
        final ErrorMessage errorMessage = new ErrorMessage(status.getStatusCode(), exception.getMessage());
        return Response.status(status).entity(errorMessage).build();
    }
}
