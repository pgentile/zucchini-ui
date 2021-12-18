package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Scenario;
import org.springframework.stereotype.Component;

@Component
class ScenarioToListItemViewMapper {

    public ScenarioListItemView map(Scenario scenario) {
        final var itemView = new ScenarioListItemView();
        itemView.setId(scenario.getId());
        itemView.setStatus(scenario.getStatus());
        itemView.setInfo(scenario.getInfo());
        itemView.setReviewed(scenario.isReviewed());
        itemView.setFeatureId(scenario.getFeatureId());
        itemView.setTestRunId(scenario.getTestRunId());
        return itemView;
    }

}
