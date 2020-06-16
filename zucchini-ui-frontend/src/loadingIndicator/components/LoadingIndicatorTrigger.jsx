import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { load, unload } from "../redux";

export default function LoadingIndicatorTrigger() {
  const dispatch = useDispatch();

  // Considérer qu'il y a un chargement en cours lorsque ce composant est présent dans l'arbre React
  useEffect(() => {
    dispatch(load());
    return () => dispatch(unload());
  }, [dispatch]);

  return null;
}
