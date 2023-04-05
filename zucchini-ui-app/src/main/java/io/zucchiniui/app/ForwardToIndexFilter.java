package io.zucchiniui.app;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;

public class ForwardToIndexFilter implements Filter {

    private static final String FORWARDED_ATTR_NAME = ForwardToIndexFilter.class.getName() + ".forwarded";

    private final String basePath;

    public ForwardToIndexFilter(String basePath) {
        this.basePath = basePath;
    }

    @Override
    public void init(FilterConfig filterConfig) {
        // Nothing to do...
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        final boolean alreadyForwarded = Boolean.TRUE.equals(request.getAttribute(FORWARDED_ATTR_NAME));
        if (alreadyForwarded) {
            chain.doFilter(request, response);
        } else {
            // Mark the request as forwarded (prevent StackOverflow)
            request.setAttribute(FORWARDED_ATTR_NAME, true);

            final HttpServletRequest httpRequest = (HttpServletRequest) request;
            final String requestPath = httpRequest.getRequestURI();

            // Redirect to base UI servlet for any URL, except assets
            if (requestPath.startsWith(basePath + "/") && !requestPath.startsWith(basePath + "/assets")) {
                request.getRequestDispatcher(basePath + "/").forward(request, response);
            } else {
                chain.doFilter(request, response);
            }
        }
    }

    @Override
    public void destroy() {
        // Nothing to do...
    }

}
