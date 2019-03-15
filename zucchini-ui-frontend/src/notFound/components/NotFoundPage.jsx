import React from "react";
import Jumbotron from "react-bootstrap/lib/Jumbotron";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>Page non trouvée</h1>
        <p>Aucune page n&apos;existe à cette adresse.</p>
      </Jumbotron>
    );
  }
}
