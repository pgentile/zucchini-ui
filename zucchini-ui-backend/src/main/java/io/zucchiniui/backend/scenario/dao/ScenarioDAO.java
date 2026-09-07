package io.zucchiniui.backend.scenario.dao;

import dev.morphia.Datastore;
import dev.morphia.query.FindOptions;
import dev.morphia.query.Query;
import dev.morphia.query.Sort;
import dev.morphia.query.filters.Filter;
import dev.morphia.query.filters.Filters;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaDAO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ScenarioDAO extends MorphiaDAO<Scenario, String> {

    public ScenarioDAO(final Datastore ds) {
        super(ds, Scenario.class);
    }

    public Query<Scenario> query(final ScenarioQuery q) {
        return query(q, new FindOptions());
    }

    public Query<Scenario> query(final ScenarioQuery q, final FindOptions options) {
        if (q.orderedByName()) {
            options.sort(Sort.ascending("info.name"));
        }

        final Query<Scenario> query = datastore.find(Scenario.class, options);

        final List<Filter> filters = new ArrayList<>();

        if (q.featureId() != null) {
            filters.add(Filters.eq("featureId", q.featureId()));
        }

        if (q.scenarioKey() != null) {
            filters.add(Filters.eq("scenarioKey", q.scenarioKey()));
        }

        if (q.testRunId() != null) {
            filters.add(Filters.eq("testRunId", q.testRunId()));
        }

        if (q.search() != null) {
            filters.add(Filters.text(q.search()));
        }

        if (q.name() != null) {
            filters.add(Filters.eq("info.name", q.name()));
        }

        if (q.tagSelection() != null && q.tagSelection().isActive()) {
            if (!q.tagSelection().getIncludedTags().isEmpty()) {
                filters.add(Filters.in("allTags", q.tagSelection().getIncludedTags()));
            }
            if (!q.tagSelection().getExcludedTags().isEmpty()) {
                filters.add(Filters.nin("allTags", q.tagSelection().getExcludedTags()));
            }
        }

        if (q.withErrorMessage()) {
            filters.add(Filters.eq("status", ScenarioStatus.FAILED));
            filters.add(Filters.exists("steps.errorMessage"));
        }

        if (!filters.isEmpty()) {
            query.filter(filters.toArray(new Filter[0]));
        }

        return query;
    }

}
