package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.scenario.dao.ScenarioQuery;
import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.Repository;

public interface ScenarioRepository extends Repository<Scenario, String> {

    PreparedQuery<Scenario> query(ScenarioQuery q);

}
