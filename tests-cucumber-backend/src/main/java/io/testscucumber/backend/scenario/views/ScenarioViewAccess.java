package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.scenario.domainimpl.ScenarioDAO;
import io.testscucumber.backend.support.ddd.morphia.MorphiaUtils;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import ma.glasnost.orika.BoundMapperFacade;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
public class ScenarioViewAccess {

    private final ScenarioDAO scenarioDAO;

    private final TestRunRepository testRunRepository;

    private final BoundMapperFacade<Scenario, ScenarioListItemView> scenarioToListItemView;

    private final BoundMapperFacade<Scenario, ScenarioHistoryItemView> scenarioToHistoryItemView;

    @Autowired
    public ScenarioViewAccess(final ScenarioDAO scenarioDAO, final TestRunRepository testRunRepository) {
        this.scenarioDAO = scenarioDAO;
        this.testRunRepository = testRunRepository;

        final ScenarioViewMapper mapper = new ScenarioViewMapper();
        scenarioToListItemView = mapper.dedicatedMapperFor(Scenario.class, ScenarioListItemView.class, false);
        scenarioToHistoryItemView = mapper.dedicatedMapperFor(Scenario.class, ScenarioHistoryItemView.class, false);
    }

    public List<ScenarioListItemView> getScenarioListItems(final Consumer<ScenarioQuery> preparator) {
        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(preparator)
            .retrievedFields(true, "id", "info", "status", "testRunId");

        return MorphiaUtils.streamQuery(query)
            .map(scenarioToListItemView::map)
            .collect(Collectors.toList());
    }

    public List<ScenarioHistoryItemView> getScenarioHistory(final String scenarioKey) {
        return testRunRepository.query(TestRunQuery::orderByLatestFirst)
            .stream()
            .map(testRun -> {
                final Scenario scenario = scenarioDAO.prepareTypedQuery(q -> q.withTestRunId(testRun.getId()).withScenarioKey(scenarioKey))
                    .retrievedFields(true, "id", "info", "status", "testRunId")
                    .get();

                if (scenario == null) {
                    return null;
                }

                final ScenarioHistoryItemView item = scenarioToHistoryItemView.map(scenario);
                item.setTestRun(testRun);
                return item;
            })
            .filter(item -> item != null)
            .collect(Collectors.toList());
    }

}
