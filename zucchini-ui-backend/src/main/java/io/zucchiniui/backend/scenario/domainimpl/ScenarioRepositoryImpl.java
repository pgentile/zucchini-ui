package io.zucchiniui.backend.scenario.domainimpl;

import io.zucchiniui.backend.scenario.dao.ScenarioDAO;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioQuery;
import io.zucchiniui.backend.scenario.domain.ScenarioRepository;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.stereotype.Component;

@Component
class ScenarioRepositoryImpl extends MorphiaQueriableRepository<Scenario, String, ScenarioQuery> implements ScenarioRepository {

    public ScenarioRepositoryImpl(final ScenarioDAO dao) {
        super(dao);
    }

}
