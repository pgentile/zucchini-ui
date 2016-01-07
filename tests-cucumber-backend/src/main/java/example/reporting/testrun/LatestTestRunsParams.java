package example.reporting.testrun;

import javax.ws.rs.QueryParam;

public class LatestTestRunsParams {

    @QueryParam("env")
    private String env;

    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }

}
