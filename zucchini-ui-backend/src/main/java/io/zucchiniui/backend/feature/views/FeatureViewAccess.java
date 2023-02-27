package io.zucchiniui.backend.feature.views;

import io.zucchiniui.backend.feature.dao.FeatureDAO;
import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureQuery;
import io.zucchiniui.backend.scenario.dao.ScenarioQuery;
import io.zucchiniui.backend.scenario.views.ScenarioStats;
import io.zucchiniui.backend.scenario.views.ScenarioViewAccess;
import io.zucchiniui.backend.shared.domain.TagSelection;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaUtils;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import org.springframework.stereotype.Component;
import xyz.morphia.query.Query;

import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Component
public class FeatureViewAccess {

    private final FeatureDAO featureDAO;

    private final ScenarioViewAccess scenarioViewAccess;

    private final TestRunRepository testRunRepository;

    private final FeatureToHistoryItemMapper featureToHistoryItemMapper;

    private final FeatureToListItemMapper featureToListItemMapper;

    public FeatureViewAccess(
        final FeatureDAO featureDAO,
        final ScenarioViewAccess scenarioViewAccess,
        final TestRunRepository testRunRepository,
        final FeatureToHistoryItemMapper featureToHistoryItemMapper,
        final FeatureToListItemMapper featureToListItemMapper
    ) {
        this.featureDAO = featureDAO;
        this.scenarioViewAccess = scenarioViewAccess;
        this.testRunRepository = testRunRepository;
        this.featureToHistoryItemMapper = featureToHistoryItemMapper;
        this.featureToListItemMapper = featureToListItemMapper;
    }

    public List<FeatureListItem> getFeatureListItems(
        final FeatureQuery q,
        final TagSelection tagSelection,
        final boolean withStats
    ) {
        FeatureQuery queryWithFeatureIds = q;

        if (tagSelection.isActive()) {
            final Set<String> featureIdsForTags = scenarioViewAccess.getFeatureIdsForTags(tagSelection);
            queryWithFeatureIds = queryWithFeatureIds.withIdIn(featureIdsForTags);
        }

        final Query<Feature> query = featureDAO.query(queryWithFeatureIds)
            .project("testRunId", true)
            .project("info", true)
            .project("group", true)
            .project("status", true);

        return MorphiaUtils.streamQuery(query)
            .map(feature -> {
                final FeatureListItem item = featureToListItemMapper.map(feature);

                if (withStats || tagSelection.isActive()) {
                    final var sq = new ScenarioQuery().withFeatureId(feature.getId()).withSelectedTags(tagSelection);
                    final ScenarioStats stats = scenarioViewAccess.getStats(sq);
                    item.setStatus(stats.computeFeatureStatus());
                    item.setStats(stats);
                }
                return item;
            })
            .toList();
    }

    public List<FeatureHistoryItem> getFeatureHistory(final String featureKey) {
        return testRunRepository.query(new TestRunQuery().sortByLatestFirst())
            .stream()
            .flatMap(testRun -> {
                final FeatureQuery q = new FeatureQuery().withTestRunId(testRun.getId()).withFeatureKey(featureKey);
                final Feature feature = featureDAO.query(q)
                    .project("status", true)
                    .get();

                if (feature == null) {
                    return Stream.empty();
                }

                final var sq = new ScenarioQuery().withFeatureId(feature.getId());
                final ScenarioStats stats = scenarioViewAccess.getStats(sq);

                final FeatureHistoryItem item = featureToHistoryItemMapper.map(feature);
                item.setTestRun(testRun);
                item.setStats(stats);

                return Stream.of(item);
            })
            .toList();
    }

}
