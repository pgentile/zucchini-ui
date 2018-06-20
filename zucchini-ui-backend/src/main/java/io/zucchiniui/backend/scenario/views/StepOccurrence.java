package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.StepStatus;
import io.zucchiniui.backend.shared.domain.BasicInfo;

public class StepOccurrence {

    private final StepStatus status;
    private final BasicInfo info;

    StepOccurrence(BasicInfo info, StepStatus status) {
        this.info = info;
        this.status = status;
    }

    public StepStatus getStatus() {
        return status;
    }

    public BasicInfo getInfo() {
        return info;
    }
}
