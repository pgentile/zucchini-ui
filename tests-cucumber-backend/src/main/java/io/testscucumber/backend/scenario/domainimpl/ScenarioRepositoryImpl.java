package io.testscucumber.backend.scenario.domainimpl;

import io.testscucumber.backend.scenario.dao.ScenarioDAO;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.stereotype.Component;

@Component
class ScenarioRepositoryImpl extends MorphiaQueriableRepository<Scenario, String, ScenarioQuery> implements ScenarioRepository {

    public ScenarioRepositoryImpl(final ScenarioDAO dao) {
        super(dao);
    }

}
