package example.reporting.scenario;

import example.reporting.api.scenario.ScenarioListItemView;
import example.reporting.api.testrun.TestRun;
import example.reporting.testrun.LatestTestRunsParams;
import example.reporting.testrun.TestRunDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.stream.Collectors;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScenarioHistoryResource {

    private final TestRunDAO testRunDAO;

    private final ScenarioViewAccess scenarioViewAccess;

    private final String scenarioKey;

    private final String testRunId;

    @Component
    public static class Factory {

        private final TestRunDAO testRunDAO;

        private final ScenarioViewAccess scenarioViewAccess;

        @Autowired
        public Factory(TestRunDAO testRunDAO, ScenarioViewAccess scenarioViewAccess) {
            this.testRunDAO = testRunDAO;
            this.scenarioViewAccess = scenarioViewAccess;
        }

        public ScenarioHistoryResource create(String scenarioKey, String testRunId) {
            return new ScenarioHistoryResource(this, scenarioKey, testRunId);
        }

    }

    private ScenarioHistoryResource(Factory factory, String scenarioKey, String testRunId) {
        testRunDAO = factory.testRunDAO;
        scenarioViewAccess = factory.scenarioViewAccess;
        this.scenarioKey = scenarioKey;
        this.testRunId = testRunId;
    }

    @GET
    public List<ScenarioListItemView> get() {
        final TestRun scenarioTestRun = testRunDAO.get(testRunId);

        final LatestTestRunsParams latestTestRunsParams = new LatestTestRunsParams();
        latestTestRunsParams.setEnv(scenarioTestRun.getEnv());

        return testRunDAO.getLatests(latestTestRunsParams).stream()
            .map(testRun -> scenarioViewAccess.getScenarioByTestRunIdAndScenarioKey(testRun.getId(), scenarioKey))
            .collect(Collectors.toList());
    }

}
