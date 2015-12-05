package example.views;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.jaxrs.cfg.EndpointConfigBase;
import com.fasterxml.jackson.jaxrs.cfg.ObjectWriterInjector;
import com.fasterxml.jackson.jaxrs.cfg.ObjectWriterModifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.Locale;

@Provider
public class ViewKindFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(ViewKindFilter.class);

    private static final String VIEW_KIND_PROP = ViewKindFilter.class.getName() + ".viewKind";

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        final String viewKind = requestContext.getUriInfo().getQueryParameters().getFirst("viewKind");
        requestContext.setProperty(VIEW_KIND_PROP, viewKind);
    }

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        final String viewKind = (String) requestContext.getProperty(VIEW_KIND_PROP);
        setupOutputView(viewKind);
    }

    private void setupOutputView(final String viewKind) {
        LOGGER.info("View kind: {}", viewKind);

        // Piloter la sérialisation de Jackson avec ce ObjectWriterModifier
        // NB : ObjectWriterModifier est placé dans une variable ThreadLocal (via l'ObjectWriterInjector) pour
        // être ensuite exploité par le writer JAX-RS Jackson
        ObjectWriterInjector.set(new ObjectWriterModifier() {

            @Override
            public ObjectWriter modify(EndpointConfigBase<?> endpoint, MultivaluedMap<String, Object> responseHeaders, Object valueToWrite, ObjectWriter w, JsonGenerator g) throws IOException {
                if (viewKind == null) {
                    return w.withView(Views.Public.class);
                }

                switch (viewKind.toUpperCase(Locale.ENGLISH)) {
                    case "INTERNAL":
                        return w.withView(Views.Internal.class);
                    case "PUBLIC":
                        return w.withView(Views.Public.class);
                    default:
                        LOGGER.warn("Unkwown view kind '{}', using default writer", viewKind);
                        return w.withView(Views.Public.class);
                }
            }

        });
    }

}
