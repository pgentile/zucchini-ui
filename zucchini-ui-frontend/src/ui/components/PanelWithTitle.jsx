import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export default function PanelWithTitle({ title, panelBody = false, children, ...otherProps }) {
  return (
    <Card {...otherProps}>
      <Card.Header>
        <Card.Title as="h6" className="mb-0">
          {title}
        </Card.Title>
      </Card.Header>
      {panelBody ? <Card.Body>{children}</Card.Body> : children}
    </Card>
  );
}

PanelWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  panelBody: PropTypes.bool,
  children: PropTypes.node.isRequired
};
