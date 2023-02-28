package io.zucchiniui.backend.scenario.domainimpl;

import io.zucchiniui.backend.scenario.dao.ScenarioDAO;
import io.zucchiniui.backend.scenario.dao.ScenarioQuery;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioRepository;
import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaRepository;
import org.springframework.stereotype.Component;

@Component
class ScenarioRepositoryImpl extends MorphiaRepository<Scenario, String, ScenarioDAO> implements ScenarioRepository {

    public ScenarioRepositoryImpl(final ScenarioDAO dao) {
        super(dao);
    }

    @Override
    public PreparedQuery<Scenario> query(ScenarioQuery q) {
        return prepareQuery(dao -> dao.query(q));
    }

}
