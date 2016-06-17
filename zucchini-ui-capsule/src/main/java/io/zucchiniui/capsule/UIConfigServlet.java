package io.zucchiniui.capsule;

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
        uiConfig.setBackendBaseUri(getBackendBaseUri(request));

        response.setStatus(200);
        response.setContentType("application/javascript");

        final String serializedConfig = objectMapper.writeValueAsString(uiConfig);
        response.getOutputStream().print("var configuration = " + serializedConfig + ";");
    }

    private String getBackendBaseUri(final HttpServletRequest request) {
        final StringBuilder baseUri = new StringBuilder();
        baseUri.append(request.getScheme()).append("://").append(request.getServerName());

        final boolean addPort;
        switch (request.getScheme()) {
            case "http":
                addPort = (request.getServerPort() != 80);
                break;
            case "https":
                addPort = (request.getServerPort() != 443);
                break;
            default:
                addPort = true;
                break;
        }
        if (addPort) {
            baseUri.append(':').append(request.getServerPort());
        }

        return baseUri.toString();
    }

}
