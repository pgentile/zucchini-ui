package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.feature.domainimpl.FeatureDAO;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import io.testscucumber.backend.support.ddd.morphia.MorphiaUtils;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import ma.glasnost.orika.BoundMapperFacade;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;
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

    public FeatureStats getStatsForFeatureById(final String featureId) {
        final Map<ScenarioStatus, Integer> statsByStatus = new EnumMap<>(ScenarioStatus.class);
        for (final ScenarioStatus status : ScenarioStatus.values()) {
            statsByStatus.put(status, 0);
        }

        final List<ScenarioStatus> scenariiStatus = scenarioViewAccess.getScenariiStatusByFeatureId(featureId);
        scenariiStatus.forEach(status -> statsByStatus.compute(status, (key, count) -> count + 1));
        return new FeatureStats(scenariiStatus.size(), statsByStatus);
    }

    public List<FeatureListItem> getFeatureListItems(final Consumer<FeatureQuery> preparator, final boolean withStats) {
        final Query<Feature> query = featureDAO.prepareTypedQuery(preparator)
            .retrievedFields(true, "id", "testRunId", "info", "status");

        return MorphiaUtils.streamQuery(query)
            .map(feature -> {
                final FeatureListItem item = featureToListItemMapper.map(feature);
                if (withStats) {
                    item.setStats(getStatsForFeatureById(feature.getId()));
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

                final FeatureHistoryItem item = featureToHistoryItemMapper.map(feature);
                item.setTestRun(testRun);
                item.setStats(getStatsForFeatureById(feature.getId()));
                return item;
            })
            .filter(item -> item != null)
            .collect(Collectors.toList());
    }

    public List<FeatureStatus> getFeaturesStatusByTestRunId(final String testRunId) {
        final Query<Feature> query = featureDAO.prepareTypedQuery(q -> q.withTestRunId(testRunId))
            .retrievedFields(true, "id", "status");

        return MorphiaUtils.streamQuery(query)
            .map(Feature::getStatus)
            .collect(Collectors.toList());
    }

}
