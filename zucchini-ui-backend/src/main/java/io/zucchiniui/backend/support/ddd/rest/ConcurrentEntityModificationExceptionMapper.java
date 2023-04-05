package io.zucchiniui.backend.support.ddd.rest;

import io.dropwizard.jersey.errors.ErrorMessage;
import io.zucchiniui.backend.support.ddd.ConcurrentEntityModificationException;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ConcurrentEntityModificationExceptionMapper implements ExceptionMapper<ConcurrentEntityModificationException> {

    @Override
    public Response toResponse(final ConcurrentEntityModificationException exception) {
        final Response.Status status = Response.Status.CONFLICT;
        final ErrorMessage errorMessage = new ErrorMessage(status.getStatusCode(), exception.getMessage());
        return Response.status(status).entity(errorMessage).build();
    }

}
