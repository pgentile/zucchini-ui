package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.dao.ScenarioDAO;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.shared.domain.TagSelection;
import io.testscucumber.backend.support.ddd.morphia.MorphiaRawQuery;
import io.testscucumber.backend.support.ddd.morphia.MorphiaUtils;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import ma.glasnost.orika.BoundMapperFacade;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
            .retrievedFields(true, "id", "info", "status", "testRunId", "featureId", "reviewed");

        return MorphiaUtils.streamQuery(query)
            .map(scenarioToListItemViewMapper::map)
            .collect(Collectors.toList());
    }

    public Map<String, ScenarioListItemView> getScenarioListItemsGroupedByScenarioKey(final Consumer<ScenarioQuery> preparator) {
        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(preparator)
            .retrievedFields(true, "id", "info", "status", "testRunId", "featureId", "reviewed", "scenarioKey");

        return MorphiaUtils.streamQuery(query).collect(Collectors.toMap(Scenario::getScenarioKey, scenarioToListItemViewMapper::map));
    }

    public List<ScenarioHistoryItemView> getScenarioHistory(final String scenarioKey) {
        return testRunRepository.query(TestRunQuery::orderByLatestFirst)
            .stream()
            .flatMap(testRun -> {
                final Scenario scenario = scenarioDAO.prepareTypedQuery(q -> q.withTestRunId(testRun.getId()).withScenarioKey(scenarioKey))
                    .retrievedFields(true, "id", "status")
                    .get();

                if (scenario == null) {
                    return Stream.empty();
                }

                final ScenarioHistoryItemView item = scenarioToHistoryItemViewMapper.map(scenario);
                item.setTestRun(testRun);
                return Stream.of(item);
            })
            .collect(Collectors.toList());
    }

    public ScenarioStats getStats(final Consumer<ScenarioQuery> preparator) {
        final ScenarioStats stats = new ScenarioStats();

        new MorphiaRawQuery(scenarioDAO.prepareTypedQuery(preparator))
            .includeFields("status", "reviewed")
            .stream()
            .forEach(dbObj -> {
                final String statusStr = (String) dbObj.get("status");
                final boolean reviewed = (Boolean) dbObj.get("reviewed");
                stats.addScenarioStatus(ScenarioStatus.valueOf(statusStr), reviewed);
            });

        return stats;
    }

    public List<ScenarioTagStats> getTagStats(final Consumer<ScenarioQuery> preparator, final Collection<String> tags) {
        // Filter tags if requested
        final Predicate<String> tagFilter;
        if (tags.isEmpty()) {
            tagFilter = ignored -> true;
        } else {
            tagFilter = tags::contains;
        }

        final Map<String, ScenarioStats> statsByTag = new HashMap<>();

        // Raw Mongo query for performance, to bypass Morphia object conversion
        new MorphiaRawQuery(scenarioDAO.prepareTypedQuery(preparator))
            .includeFields("status", "reviewed", "allTags")
            .stream()
            .forEach(dbObj -> {
                final String statusStr = (String) dbObj.get("status");
                final boolean reviewed = (Boolean) dbObj.get("reviewed");

                @SuppressWarnings("unchecked")
                final List<String> scenarioTags = (List) dbObj.get("allTags");

                scenarioTags.stream()
                    .filter(tagFilter)
                    .forEach(tag -> {
                        final ScenarioStats tagStats = statsByTag.computeIfAbsent(tag, key -> new ScenarioStats());
                        tagStats.addScenarioStatus(ScenarioStatus.valueOf(statusStr), reviewed);
                    });
            });

        return statsByTag.entrySet().stream()
            .map(entry -> new ScenarioTagStats(entry.getKey(), entry.getValue()))
            .sorted(Comparator.comparing(ScenarioTagStats::getTag))
            .collect(Collectors.toList());
    }

    public Set<String> getFeatureIdsForTags(final TagSelection tagSelection) {
        return new MorphiaRawQuery(scenarioDAO.prepareTypedQuery(q -> q.withSelectedTags(tagSelection)))
            .includeFields("featureId")
            .stream()
            .map(dbObj -> (String) dbObj.get("featureId"))
            .collect(Collectors.toSet());
    }

}
