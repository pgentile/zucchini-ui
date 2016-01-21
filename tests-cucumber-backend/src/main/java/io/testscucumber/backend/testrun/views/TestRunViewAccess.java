package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.feature.views.FeatureStats;
import io.testscucumber.backend.feature.views.FeatureViewAccess;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import io.testscucumber.backend.support.ddd.morphia.MorphiaUtils;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domainimpl.TestRunDAO;
import ma.glasnost.orika.BoundMapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
public class TestRunViewAccess {

    private final TestRunDAO testRunDAO;

    private final FeatureViewAccess featureViewAccess;

    private final ScenarioViewAccess scenarioViewAccess;

    private final BoundMapperFacade<TestRun, TestRunListItem> testRunToListItemMapper;

    @Autowired
    public TestRunViewAccess(
        final TestRunDAO testRunDAO,
        final FeatureViewAccess featureViewAccess,
        final ScenarioViewAccess scenarioViewAccess
    ) {
        this.testRunDAO = testRunDAO;
        this.featureViewAccess = featureViewAccess;
        this.scenarioViewAccess = scenarioViewAccess;

        final TestRunMapper mapper = new TestRunMapper();
        testRunToListItemMapper = mapper.dedicatedMapperFor(TestRun.class, TestRunListItem.class, false);
    }

    public List<TestRunListItem> getTestRunListItems(final Consumer<TestRunQuery> preparator, final boolean withStats) {
        return MorphiaUtils.streamQuery(testRunDAO.prepareTypedQuery(preparator))
            .map(testRun -> {
                final TestRunListItem item = testRunToListItemMapper.map(testRun);
                if (withStats) {
                    item.setStats(getStatsForFeaturesByTestRunId(item.getId()));
                }
                return item;
            })
            .collect(Collectors.toList());
    }

    public FeatureStats getStatsForFeaturesByTestRunId(final String testRunId) {
        return featureViewAccess.getStats(q -> q.withTestRunId(testRunId));
    }

    public ScenarioStats getStatsForScenariiByTestRunId(final String testRunId) {
        return scenarioViewAccess.getStats(q -> q.withTestRunId(testRunId));
    }

    public List<ScenarioTagStats> getScenarioTagStats(final String testRunId) {
        return scenarioViewAccess.getTags(q -> q.withTestRunId(testRunId)).stream()
            .map(tag -> {
                final ScenarioStats stats = scenarioViewAccess.getStats(q -> q.withTestRunId(testRunId).withTag(tag));
                return new ScenarioTagStats(tag, stats);
            })
            .sorted(Comparator.comparing(ScenarioTagStats::getTag))
            .collect(Collectors.toList());
    }

}
