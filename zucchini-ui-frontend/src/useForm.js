import { useRef, useCallback, useState } from "react";
import { updateValue, update } from "./tools/updater";

export default function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  const initialStateRef = useRef();
  initialStateRef.current = initialState;

  const reset = useCallback(() => {
    setValues(initialStateRef.current);
  }, []);

  const updateValues = useCallback((name, updaterFn) => {
    setValues((currentValues) => update(currentValues, name, updaterFn));
  }, []);

  const updateFieldValue = useCallback((name, value) => {
    setValues((currentValues) => updateValue(currentValues, name, value));
  }, []);

  const handleValueChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      updateFieldValue(name, value);
    },
    [updateFieldValue]
  );

  const handleCheckboxChange = useCallback(
    (event) => {
      const { name, checked } = event.target;
      updateFieldValue(name, checked);
    },
    [updateFieldValue]
  );

  const handleRadioChange = useCallback(
    (event) => {
      const { name, value, checked } = event.target;
      if (checked) {
        updateFieldValue(name, value);
      }
    },
    [updateFieldValue]
  );

  return {
    values,
    setValues,
    updateValues,
    handleValueChange,
    handleCheckboxChange,
    handleRadioChange,
    reset
  };
}
