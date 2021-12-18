package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Scenario;
import org.springframework.stereotype.Component;

@Component
class FailedScenarioToListItemViewMapper {

    public FailedScenarioListItemView map(Scenario scenario) {
        final var itemView = new FailedScenarioListItemView();
        itemView.setId(scenario.getId());
        itemView.setTestRunId(scenario.getTestRunId());
        itemView.setFeatureId(scenario.getFeatureId());
        itemView.setStatus(scenario.getStatus());
        itemView.setReviewed(scenario.isReviewed());
        itemView.setInfo(scenario.getInfo());
        itemView.setErrorMessage(scenario.getErrorMessage().orElse(null));
        return itemView;
    }

}
