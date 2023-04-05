package io.zucchiniui.backend.support.ddd.rest;

import io.zucchiniui.backend.support.ddd.EntityNotFoundException;
import io.dropwizard.jersey.errors.ErrorMessage;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class EntityNotFoundExceptionMapper implements ExceptionMapper<EntityNotFoundException> {

    @Override
    public Response toResponse(final EntityNotFoundException exception) {
        final Response.Status status = Response.Status.NOT_FOUND;
        final ErrorMessage errorMessage = new ErrorMessage(status.getStatusCode(), exception.getMessage());
        return Response.status(status).entity(errorMessage).build();
    }
}
