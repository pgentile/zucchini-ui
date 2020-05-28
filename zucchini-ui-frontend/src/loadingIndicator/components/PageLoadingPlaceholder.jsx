import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { load, unload } from "../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function PageLoadingPlaceholder() {
  const dispatch = useDispatch();

  // Considérer qu'il y a un chargement en cours lorsque ce composant est affiché
  useEffect(() => {
    dispatch(load());
    return () => dispatch(unload());
  }, [dispatch]);

  return (
    <>
      <p className="lead text-center">Chargement de la page en cours&hellip;</p>
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />
      </div>
    </>
  );
}
