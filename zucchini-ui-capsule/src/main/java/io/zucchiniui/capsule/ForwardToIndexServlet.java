package io.zucchiniui.capsule;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ForwardToIndexServlet extends HttpServlet {

    private final String basePath;

    public ForwardToIndexServlet(String basePath) {
        this.basePath = basePath;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(basePath + "/").forward(request, response);
    }

}
