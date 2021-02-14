import PropTypes from "prop-types";
import { memo } from "react";

import SimpleText from "../../ui/components/SimpleText";
import Status from "../../ui/components/Status";
import PanelWithTitle from "../../ui/components/PanelWithTitle";
import ElementInfo from "../../ui/components/ElementInfo";
import StepTable from "./StepTable";
import StepAttachments from "./StepAttachments";
import { useSelector } from "react-redux";

function Step({ step, special = false }) {
  const scenarioId = useSelector((state) => state.scenario.scenario.id);
  const filters = useSelector((state) => state.stepFilters);

  const title = <ElementInfo info={step.info} />;

  let errorMessage = null;
  if (step.errorMessage) {
    errorMessage = <ErrorMessage errorMessage={step.errorMessage} />;
  }

  let logs = null;
  if (step.output) {
    logs = <LogOutput output={step.output} />;
  }

  let table = null;
  if (step.table) {
    table = <StepTable table={step.table} />;
  }

  let attachments = null;
  if (step.attachments && step.attachments.length > 0) {
    attachments = <StepAttachments scenarioId={scenarioId} attachments={step.attachments} />;
  }

  const hasError = ["FAILED", "UNDEFINED"].includes(step.status);

  return (
    <>
      {filters.comments && step.comment && <SimpleText className="text-muted" text={step.comment} />}

      <p className={hasError ? "text-danger" : null}>
        {special ? <i>{title}</i> : title} <Status status={step.status} />
      </p>

      {table}
      {filters.errorDetails && errorMessage}
      {filters.logs && logs}
      {filters.attachments && attachments}
    </>
  );
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  special: PropTypes.bool
};

export default memo(Step);

function ErrorMessage({ errorMessage }) {
  return (
    <PanelWithTitle title="Message d'erreur" panelBody bg="danger" text="white" className="mb-3">
      <pre className="mb-0 text-white">{errorMessage}</pre>
    </PanelWithTitle>
  );
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

function LogOutput({ output }) {
  return (
    <PanelWithTitle title="Logs" panelBody className="mb-3">
      <pre className="mb-0">{output}</pre>
    </PanelWithTitle>
  );
}

LogOutput.propTypes = {
  output: PropTypes.string.isRequired
};
