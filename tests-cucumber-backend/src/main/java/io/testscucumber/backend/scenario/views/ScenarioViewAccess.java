package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.dao.ScenarioDAO;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.shared.domain.TagSelection;
import io.testscucumber.backend.support.ddd.morphia.MorphiaUtils;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import ma.glasnost.orika.BoundMapperFacade;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Component
public class ScenarioViewAccess {

    private final ScenarioDAO scenarioDAO;

    private final TestRunRepository testRunRepository;

    private final BoundMapperFacade<Scenario, ScenarioListItemView> scenarioToListItemViewMapper;

    private final BoundMapperFacade<Scenario, ScenarioHistoryItemView> scenarioToHistoryItemViewMapper;

    @Autowired
    public ScenarioViewAccess(final ScenarioDAO scenarioDAO, final TestRunRepository testRunRepository) {
        this.scenarioDAO = scenarioDAO;
        this.testRunRepository = testRunRepository;

        final ScenarioViewMapper mapper = new ScenarioViewMapper();
        scenarioToListItemViewMapper = mapper.dedicatedMapperFor(Scenario.class, ScenarioListItemView.class, false);
        scenarioToHistoryItemViewMapper = mapper.dedicatedMapperFor(Scenario.class, ScenarioHistoryItemView.class, false);
    }

    public List<ScenarioListItemView> getScenarioListItems(final Consumer<ScenarioQuery> preparator) {
        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(preparator)
            .retrievedFields(true, "id", "info", "status", "testRunId", "featureId");

        return MorphiaUtils.streamQuery(query)
            .map(scenarioToListItemViewMapper::map)
            .collect(Collectors.toList());
    }

    public List<ScenarioHistoryItemView> getScenarioHistory(final String scenarioKey) {
        return testRunRepository.query(TestRunQuery::orderByLatestFirst)
            .stream()
            .map(testRun -> {
                final Scenario scenario = scenarioDAO.prepareTypedQuery(q -> q.withTestRunId(testRun.getId()).withScenarioKey(scenarioKey))
                    .retrievedFields(true, "id", "status")
                    .get();

                if (scenario == null) {
                    return null;
                }

                final ScenarioHistoryItemView item = scenarioToHistoryItemViewMapper.map(scenario);
                item.setTestRun(testRun);
                return item;
            })
            .filter(item -> item != null)
            .collect(Collectors.toList());
    }

    public ScenarioStats getStats(final Consumer<ScenarioQuery> preparator) {
        final ScenarioStats stats = new ScenarioStats();

        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(preparator)
            .retrievedFields(true, "id", "status");

        MorphiaUtils.streamQuery(query)
            .map(Scenario::getStatus)
            .forEach(stats::addScenarioStatus);

        return stats;
    }

    public List<ScenarioTagStats> getTagStats(final Consumer<ScenarioQuery> preparator, final Collection<String> tags) {
        // Filter tags if requested
        Predicate<String> tagFilter = ignored -> true;
        if (!tags.isEmpty()) {
            tagFilter = tags::contains;
        }

        return getTags(preparator).stream()
            .filter(tagFilter)
            .map(tag -> {
                final ScenarioStats stats = getStats(preparator.andThen(q -> q.withTag(tag)));
                return new ScenarioTagStats(tag, stats);
            })
            .sorted(Comparator.comparing(ScenarioTagStats::getTag))
            .collect(Collectors.toList());
    }

    public Set<String> getFeatureIdsForTags(final TagSelection tagSelection) {
        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(q -> q.withSelectedTags(tagSelection))
            .retrievedFields(true, "id", "featureId");

        return MorphiaUtils.streamQuery(query)
            .map(Scenario::getFeatureId)
            .collect(Collectors.toSet());
    }

    private Set<String> getTags(final Consumer<ScenarioQuery> preparator) {
        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(preparator)
            .retrievedFields(true, "id", "allTags");

        return MorphiaUtils.streamQuery(query)
            .flatMap(scenario -> scenario.getAllTags().stream())
            .collect(Collectors.toSet());
    }

}
