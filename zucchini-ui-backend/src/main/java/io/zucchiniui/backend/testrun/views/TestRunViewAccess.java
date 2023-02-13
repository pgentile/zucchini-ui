package io.zucchiniui.backend.testrun.views;

import com.google.common.collect.Sets;
import io.zucchiniui.backend.scenario.views.ScenarioListItemView;
import io.zucchiniui.backend.scenario.views.ScenarioStats;
import io.zucchiniui.backend.scenario.views.ScenarioViewAccess;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaUtils;
import io.zucchiniui.backend.testrun.dao.TestRunDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class TestRunViewAccess {

    private final TestRunRepository testRunRepository;

    private final TestRunDAO testRunDAO;

    private final ScenarioViewAccess scenarioViewAccess;

    private final TestRunToListItemMapper testRunToListItemMapper;

    public TestRunViewAccess(
        final TestRunRepository testRunRepository,
        final TestRunDAO testRunDAO,
        final ScenarioViewAccess scenarioViewAccess,
        TestRunToListItemMapper testRunToListItemMapper
    ) {
        this.testRunRepository = testRunRepository;
        this.testRunDAO = testRunDAO;
        this.scenarioViewAccess = scenarioViewAccess;
        this.testRunToListItemMapper = testRunToListItemMapper;
    }

    public List<TestRunListItem> getTestRunListItems(final TestRunQuery testRunQuery, final boolean withStats) {
        return MorphiaUtils.streamQuery(testRunDAO.query(testRunQuery))
            .map(testRun -> {
                final TestRunListItem item = testRunToListItemMapper.map(testRun);
                if (withStats) {
                    final ScenarioStats stats = scenarioViewAccess.getStats(q -> q.withTestRunId(item.getId()));
                    item.setStats(stats);
                }
                return item;
            })
            .toList();
    }

    public TestRunScenarioDiff getScenarioDiff(final String leftTestRunId, final String rightTestRunId) {
        final TestRun leftTestRun = testRunRepository.getById(leftTestRunId);
        final TestRun rightTestRun = testRunRepository.getById(rightTestRunId);

        final Map<String, ScenarioListItemView> leftScenarii = scenarioViewAccess.getScenarioListItemsGroupedByScenarioKey(q -> q.withTestRunId(leftTestRunId));
        final Map<String, ScenarioListItemView> rightScenarii = scenarioViewAccess.getScenarioListItemsGroupedByScenarioKey(q -> q.withTestRunId(rightTestRunId));

        final Set<String> newScenarioFeatureKeys = Sets.difference(rightScenarii.keySet(), leftScenarii.keySet());
        final List<ScenarioListItemView> newScenarii = newScenarioFeatureKeys.stream()
            .map(rightScenarii::get)
            .sorted(Comparator.comparing(item -> item.getInfo().getName()))
            .toList();

        final Set<String> deletedScenarioFeatureKeys = Sets.difference(leftScenarii.keySet(), rightScenarii.keySet());
        final List<ScenarioListItemView> deletedScenarii = deletedScenarioFeatureKeys.stream()
            .map(leftScenarii::get)
            .sorted(Comparator.comparing(item -> item.getInfo().getName()))
            .toList();

        final Set<String> commonFeatureKeys = Sets.intersection(leftScenarii.keySet(), rightScenarii.keySet());

        final List<TestRunScenarioDiff.ScenarioDiff> scenarioDiffs = commonFeatureKeys.stream()
            .map(scenarioKey -> {
                final ScenarioListItemView leftScenario = leftScenarii.get(scenarioKey);
                final ScenarioListItemView rightScenario = rightScenarii.get(scenarioKey);

                if (leftScenario.getStatus() != rightScenario.getStatus()) {
                    return new TestRunScenarioDiff.ScenarioDiff(leftScenario, rightScenario);
                }

                return null;
            })
            .filter(Objects::nonNull)
            .sorted(Comparator.comparing(d -> d.left().getInfo().getName()))
            .toList();

        final TestRunScenarioDiff diff = new TestRunScenarioDiff();
        diff.setLeftTestRun(leftTestRun);
        diff.setRightTestRun(rightTestRun);
        diff.setNewScenarii(newScenarii);
        diff.setDeletedScenarii(deletedScenarii);
        diff.setDifferentScenarii(scenarioDiffs);
        return diff;
    }

}
