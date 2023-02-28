package io.zucchiniui.backend.scenario.domain;

import java.util.Optional;

public record UpdateScenarioParams(Optional<ScenarioStatus> status, Optional<Boolean> reviewed) {

}
