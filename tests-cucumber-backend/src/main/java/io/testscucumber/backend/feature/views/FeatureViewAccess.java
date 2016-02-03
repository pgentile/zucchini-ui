package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.dao.FeatureDAO;
import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import io.testscucumber.backend.shared.domain.TagSelection;
import io.testscucumber.backend.support.ddd.morphia.MorphiaUtils;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import ma.glasnost.orika.BoundMapperFacade;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
public class FeatureViewAccess {

    private final FeatureDAO featureDAO;

    private final ScenarioViewAccess scenarioViewAccess;

    private final TestRunRepository testRunRepository;

    private final BoundMapperFacade<Feature, FeatureHistoryItem> featureToHistoryItemMapper;

    private final BoundMapperFacade<Feature, FeatureListItem> featureToListItemMapper;

    @Autowired
    public FeatureViewAccess(
        final FeatureDAO featureDAO,
        final ScenarioViewAccess scenarioViewAccess,
        final TestRunRepository testRunRepository
    ) {
        this.featureDAO = featureDAO;
        this.scenarioViewAccess = scenarioViewAccess;
        this.testRunRepository = testRunRepository;

        final FeatureViewMapper mapper = new FeatureViewMapper();
        featureToHistoryItemMapper = mapper.dedicatedMapperFor(Feature.class, FeatureHistoryItem.class, false);
        featureToListItemMapper = mapper.dedicatedMapperFor(Feature.class, FeatureListItem.class, false);
    }

    public List<FeatureListItem> getFeatureListItems(
        final Consumer<FeatureQuery> preparator,
        final TagSelection tagSelection,
        final boolean withStats
    ) {
        Consumer<FeatureQuery> updatedPreparator = preparator;

        if (tagSelection.isActive()) {
            final Set<String> featureIdsForTags = scenarioViewAccess.getFeatureIdsForTags(tagSelection);
            updatedPreparator = updatedPreparator.andThen(q -> q.withIdIn(featureIdsForTags));
        }

        final Query<Feature> query = featureDAO.prepareTypedQuery(updatedPreparator)
            .retrievedFields(true, "id", "testRunId", "info", "group", "status");

        return MorphiaUtils.streamQuery(query)
            .map(feature -> {
                final FeatureListItem item = featureToListItemMapper.map(feature);

                if (withStats) {
                    final ScenarioStats stats = scenarioViewAccess.getStats(q -> q.withFeatureId(feature.getId()).withSelectedTags(tagSelection));
                    item.setStatus(stats.computeStatus());
                    item.setStats(stats);
                }
                return item;
            })
            .collect(Collectors.toList());
    }

    public List<FeatureHistoryItem> getFeatureHistory(final String featureKey) {
        return testRunRepository.query(TestRunQuery::orderByLatestFirst)
            .stream()
            .map(testRun -> {
                final Feature feature = featureDAO.prepareTypedQuery(q -> q.withTestRunId(testRun.getId()).withFeatureKey(featureKey))
                    .retrievedFields(true, "id", "status")
                    .get();

                if (feature == null) {
                    return null;
                }

                final ScenarioStats stats = scenarioViewAccess.getStats(q -> q.withFeatureId(feature.getId()));

                final FeatureHistoryItem item = featureToHistoryItemMapper.map(feature);
                item.setTestRun(testRun);
                item.setStats(stats);
                return item;
            })
            .filter(item -> item != null)
            .collect(Collectors.toList());
    }

}
