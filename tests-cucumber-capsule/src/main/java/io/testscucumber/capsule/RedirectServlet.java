package io.testscucumber.capsule;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

class RedirectServlet extends HttpServlet {

    private final String targetPath;

    public RedirectServlet(String targetPath) {
        this.targetPath = targetPath;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect(targetPath);
    }

}
