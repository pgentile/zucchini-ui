package example.reporting.application;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.client.ClientRequestContext;
import javax.ws.rs.client.ClientRequestFilter;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.net.URI;

@Provider
public class CustomizeRequestUriFilter implements ClientRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomizeRequestUriFilter.class);

    private static final String NEW_HOST_NAME = "example.org";

    @Override
    public void filter(ClientRequestContext requestContext) throws IOException {
        final URI uri = requestContext.getUri();

        LOGGER.info("Replacing host {} with {}", uri.getHost(), NEW_HOST_NAME);
        final UriBuilder uriBuilder = UriBuilder.fromUri(uri).host(NEW_HOST_NAME);

        requestContext.setUri(uriBuilder.build());
    }

}
