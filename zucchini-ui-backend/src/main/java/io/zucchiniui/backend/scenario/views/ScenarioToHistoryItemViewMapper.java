package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Scenario;
import org.springframework.stereotype.Component;

@Component
class ScenarioToHistoryItemViewMapper {

    public ScenarioHistoryItemView map(Scenario scenario) {
        final var itemView = new ScenarioHistoryItemView();
        itemView.setId(scenario.getId());
        itemView.setStatus(scenario.getStatus());
        return itemView;
    }

}
