package io.zucchiniui.backend.scenario.dao;

import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import org.springframework.stereotype.Component;
import xyz.morphia.Datastore;
import xyz.morphia.dao.BasicDAO;
import xyz.morphia.query.Query;

@Component
public class ScenarioDAO extends BasicDAO<Scenario, String> {

    public ScenarioDAO(final Datastore ds) {
        super(ds);
    }

    public Query<Scenario> query(ScenarioQuery q) {
        Query<Scenario> query = createQuery();

        if (q.featureId() != null) {
            query = query.field("featureId").equal(q.featureId());
        }

        if (q.scenarioKey() != null) {
            query = query.field("scenarioKey").equal(q.scenarioKey());
        }

        if (q.testRunId() != null) {
            query = query.field("testRunId").equal(q.testRunId());
        }

        if (q.search() != null) {
            query = query.search(q.search());
        }

        if (q.name() != null) {
            query = query.field("info.name").equal(q.name());
        }

        if (q.orderedByName()) {
            query = query.order("info.name");
        }

        if (q.tagSelection() != null && q.tagSelection().isActive()) {
            if (!q.tagSelection().getIncludedTags().isEmpty()) {
                query = query.field("allTags").in(q.tagSelection().getIncludedTags());
            }
            if (!q.tagSelection().getExcludedTags().isEmpty()) {
                query = query.field("allTags").notIn(q.tagSelection().getExcludedTags());
            }
        }

        if (q.withErrorMessage()) {
            query = query.field("status").equal(ScenarioStatus.FAILED);
            query = query.field("steps.errorMessage").exists();
        }

        return query;
    }

}
