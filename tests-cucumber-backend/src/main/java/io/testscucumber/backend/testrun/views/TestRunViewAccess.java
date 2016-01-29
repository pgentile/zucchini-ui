package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import io.testscucumber.backend.support.ddd.morphia.MorphiaUtils;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domainimpl.TestRunDAO;
import ma.glasnost.orika.BoundMapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
public class TestRunViewAccess {

    private final TestRunDAO testRunDAO;

    private final ScenarioViewAccess scenarioViewAccess;

    private final BoundMapperFacade<TestRun, TestRunListItem> testRunToListItemMapper;

    @Autowired
    public TestRunViewAccess(
        final TestRunDAO testRunDAO,
        final ScenarioViewAccess scenarioViewAccess
    ) {
        this.testRunDAO = testRunDAO;
        this.scenarioViewAccess = scenarioViewAccess;

        final TestRunMapper mapper = new TestRunMapper();
        testRunToListItemMapper = mapper.dedicatedMapperFor(TestRun.class, TestRunListItem.class, false);
    }

    public List<TestRunListItem> getTestRunListItems(final Consumer<TestRunQuery> preparator, final boolean withStats) {
        return MorphiaUtils.streamQuery(testRunDAO.prepareTypedQuery(preparator))
            .map(testRun -> {
                final TestRunListItem item = testRunToListItemMapper.map(testRun);
                if (withStats) {
                    final ScenarioStats stats = scenarioViewAccess.getStats(q -> q.withTestRunId(item.getId()));
                    item.setStats(stats);
                }
                return item;
            })
            .collect(Collectors.toList());
    }

}
