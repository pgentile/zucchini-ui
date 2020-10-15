import Spinner from "react-bootstrap/Spinner";

import LoadingIndicatorTrigger from "./LoadingIndicatorTrigger";

export default function PageLoadingPlaceholder() {
  return (
    <>
      <LoadingIndicatorTrigger />
      <p className="lead text-center">Chargement de la page en cours&hellip;</p>
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Chargement&hellip;</span>
        </Spinner>
      </div>
    </>
  );
}
