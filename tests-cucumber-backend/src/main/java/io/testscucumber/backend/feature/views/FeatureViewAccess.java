package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.feature.domainimpl.FeatureDAO;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
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
        final Set<String> tags,
        final boolean withStats
    ) {
        Consumer<FeatureQuery> updatedPreparator = preparator;

        if (!tags.isEmpty()) {
            final Set<String> featureIdsForTags = scenarioViewAccess.getFeatureIdsForTags(tags);
            updatedPreparator = updatedPreparator.andThen(q -> q.withIdIn(featureIdsForTags));
        }

        final Query<Feature> query = featureDAO.prepareTypedQuery(updatedPreparator)
            .retrievedFields(true, "id", "testRunId", "info", "group", "status");

        return MorphiaUtils.streamQuery(query)
            .map(feature -> {
                final FeatureListItem item = featureToListItemMapper.map(feature);

                ScenarioStats stats = null;
                if (withStats || !tags.isEmpty()) {
                    final Consumer<ScenarioQuery> scenarioQuery = q -> {
                        q.withFeatureId(feature.getId());

                        if (!tags.isEmpty()) {
                            q.withTags(tags);
                        }
                    };

                    stats = scenarioViewAccess.getStats(scenarioQuery);
                    item.setStatus(stats.computeStatus());
                }

                if (withStats) {
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
