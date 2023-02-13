package io.zucchiniui.app;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

class RedirectServlet extends HttpServlet {

    private final String targetPath;

    public RedirectServlet(final String targetPath) {
        this.targetPath = targetPath;
    }

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        response.sendRedirect(targetPath);
    }

}
