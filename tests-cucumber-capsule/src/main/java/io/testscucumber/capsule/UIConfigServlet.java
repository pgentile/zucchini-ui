package io.testscucumber.capsule;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

class UIConfigServlet extends HttpServlet {

    private final ObjectMapper objectMapper;

    private final String apiRootPath;

    public UIConfigServlet(final ObjectMapper objectMapper, final String apiRootPath) {
        this.objectMapper = objectMapper;
        this.apiRootPath = apiRootPath;
    }

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
        final UIConfig uiConfig = new UIConfig();
        uiConfig.setApiBaseUri(getApiBaseUri(request));

        response.setStatus(200);
        response.setContentType("application/javascript");

        final String serializedConfig = objectMapper.writeValueAsString(uiConfig);
        response.getOutputStream().print("var configuration = " + serializedConfig + ";");
    }

    private String getApiBaseUri(final HttpServletRequest request) {
        final StringBuilder apiBaseUri = new StringBuilder();
        apiBaseUri.append(request.getScheme()).append("://").append(request.getServerName());

        if ("http".equals(request.getScheme()) && request.getServerPort() != 80) {
            apiBaseUri.append(':').append(request.getServerPort());
        } else if ("https".equals(request.getScheme()) && request.getServerPort() != 443) {
            apiBaseUri.append(':').append(request.getServerPort());
        }

        apiBaseUri.append(apiRootPath);
        return apiBaseUri.toString();
    }

}
