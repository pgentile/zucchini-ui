package example.views;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.AsyncResponse;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.Suspended;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.concurrent.ExecutorService;

@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ViewResource {

    private final ExecutorService executor;

    public ViewResource(ExecutorService executor) {
        this.executor = executor;
    }

    @GET
    public TestedObject get(@Context ContainerRequestContext requestContext) {
        return new TestedObject(true, true, true);
    }

    @GET
    @Path("/async")
    public void getAsync(@Suspended AsyncResponse asyncResponse, @Context ContainerRequestContext requestContext) {
        executor.submit(() -> asyncResponse.resume(new TestedObject(true, true, true)));
    }

}
