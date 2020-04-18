import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { load, unload } from "../redux";

export default function PageLoadingPlaceholder() {
  const dispatch = useDispatch();

  // Considérer qu'il y a un chargement en cours lorsque ce composant est affiché
  useEffect(() => {
    dispatch(load());
    return () => dispatch(unload());
  }, [dispatch]);

  return <p className="lead">Chargement de la page en cours&hellip;</p>;
}
