package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.dao.ScenarioDAO;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioQuery;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import io.zucchiniui.backend.shared.domain.TagSelection;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaRawQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaUtils;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import ma.glasnost.orika.BoundMapperFacade;
import org.mongodb.morphia.query.Query;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
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

    private final BoundMapperFacade<Scenario, FailedScenarioListItemView> failedScenarioToListItemViewMapper;

    private final BoundMapperFacade<Scenario, ScenarioHistoryItemView> scenarioToHistoryItemViewMapper;

    public ScenarioViewAccess(final ScenarioDAO scenarioDAO, final TestRunRepository testRunRepository) {
        this.scenarioDAO = scenarioDAO;
        this.testRunRepository = testRunRepository;

        final ScenarioViewMapper mapper = new ScenarioViewMapper();
        scenarioToListItemViewMapper = mapper.dedicatedMapperFor(Scenario.class, ScenarioListItemView.class, false);
        failedScenarioToListItemViewMapper = mapper.dedicatedMapperFor(Scenario.class, FailedScenarioListItemView.class, false);
        scenarioToHistoryItemViewMapper = mapper.dedicatedMapperFor(Scenario.class, ScenarioHistoryItemView.class, false);
    }

    public List<ScenarioListItemView> getScenarioListItems(final Consumer<ScenarioQuery> preparator) {
        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(preparator)
            .project("info", true)
            .project("status", true)
            .project("testRunId", true)
            .project("featureId", true)
            .project("reviewed", true);

        return MorphiaUtils.streamQuery(query)
            .map(scenarioToListItemViewMapper::map)
            .collect(Collectors.toList());
    }

    public Map<String, ScenarioListItemView> getScenarioListItemsGroupedByScenarioKey(final Consumer<ScenarioQuery> preparator) {
        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(preparator)
            .project("info", true)
            .project("status", true)
            .project("testRunId", true)
            .project("featureId", true)
            .project("reviewed", true)
            .project("scenarioKey", true);

        return MorphiaUtils.streamQuery(query).collect(Collectors.toMap(Scenario::getScenarioKey, scenarioToListItemViewMapper::map));
    }

    public List<GroupedFailuresListItemView> getGroupedFailedScenarii(final Consumer<ScenarioQuery> preparator) {
        return ErrorMessageGroupingUtils.computeDistance(getFailedScenarii(preparator));
    }

    public List<FailedScenarioListItemView> getFailedScenarii(final Consumer<ScenarioQuery> preparator) {
        Consumer<ScenarioQuery> fullPreparator = preparator.andThen(ScenarioQuery::havingErrorMessage);

        final Query<Scenario> query = scenarioDAO.prepareTypedQuery(fullPreparator);
        return MorphiaUtils.streamQuery(query)
            .map(failedScenarioToListItemViewMapper::map)
            .collect(Collectors.toList());
    }

    public List<ScenarioHistoryItemView> getScenarioHistory(final String scenarioKey) {
        return testRunRepository.query(TestRunQuery::orderByLatestFirst)
            .stream()
            .flatMap(testRun -> {
                final Scenario scenario = scenarioDAO.prepareTypedQuery(q -> q.withTestRunId(testRun.getId()).withScenarioKey(scenarioKey))
                    .project("status", true)
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
                List<String> scenarioTags = (List) dbObj.get("allTags");
                if (scenarioTags == null) {
                    scenarioTags = Collections.emptyList();
                }

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
