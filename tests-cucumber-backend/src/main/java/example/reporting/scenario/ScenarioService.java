package example.reporting.scenario;

import example.reporting.api.scenario.AroundAction;
import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.Step;
import example.reporting.api.scenario.StepStatus;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ScenarioService {

    public void calculateStatusFromSteps(Scenario scenario) {
        final List<StepStatus> innerStatus = new ArrayList<>();
        if (scenario.getBackground() != null) {
            scenario.getBackground().getSteps().stream().map(Step::getStatus).forEach(innerStatus::add);
        }
        scenario.getBeforeActions().stream().map(AroundAction::getStatus).forEach(innerStatus::add);
        scenario.getSteps().stream().map(Step::getStatus).forEach(innerStatus::add);
        scenario.getAfterActions().stream().map(AroundAction::getStatus).forEach(innerStatus::add);

        for (final StepStatus oneInnerStatus : innerStatus) {
            switch (oneInnerStatus) {
                case FAILED:
                    scenario.setStatus(StepStatus.FAILED);
                    return;
                case PENDING:
                    scenario.setStatus(StepStatus.PENDING);
                    return;
                default:
                    // Rien à faire, on continue
                    break;
            }
        }

        // Tous les steps ont fonctionné : c'est good !
        if (innerStatus.stream().allMatch(StepStatus.PASSED::equals)) {
            scenario.setStatus(StepStatus.PASSED);
            return;
        }

        // Si tous les steps du scénario sont skipped, alors skipped
        if (scenario.getSteps().stream().map(Step::getStatus).allMatch(StepStatus.SKIPPED::equals)) {
            scenario.setStatus(StepStatus.SKIPPED);
            return;
        }

        // Si tous les steps du scénario sont non joués, alors non joués
        if (scenario.getSteps().stream().map(Step::getStatus).allMatch(StepStatus.NOT_RUN::equals)) {
            scenario.setStatus(StepStatus.NOT_RUN);
            return;
        }

        scenario.setStatus(StepStatus.FAILED);
    }

}
