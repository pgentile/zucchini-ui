import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import PanelWithTitle from "../../ui/components/PanelWithTitle";

export default function StepAttachments({ scenarioId, attachments }) {
  const items = attachments.map((attachment, index) => {
    return (
      <ListGroupItem key={attachment.id}>
        <a href={`/api/scenarii/${scenarioId}/attachments/${attachment.id}`} download>
          Pièce-jointe #{index + 1}
        </a>
      </ListGroupItem>
    );
  });

  return (
    <PanelWithTitle title="Pièces jointes" className="mb-3">
      <ListGroup variant="flush">{items}</ListGroup>
    </PanelWithTitle>
  );
}

StepAttachments.propTypes = {
  scenarioId: PropTypes.string.isRequired,
  attachments: PropTypes.array.isRequired
};
