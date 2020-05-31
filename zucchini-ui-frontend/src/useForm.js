import { useRef, useCallback, useState } from "react";

export default function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  const initialStateRef = useRef();
  initialStateRef.current = initialState;

  const reset = useCallback(() => {
    setValues(initialStateRef.current);
  }, []);

  const updateValue = useCallback((name, value) => {
    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value
      };
    });
  }, []);

  const handleValueChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      updateValue(name, value);
    },
    [updateValue]
  );

  const handleCheckboxChange = useCallback(
    (event) => {
      const { name, checked } = event.target;
      updateValue(name, checked);
    },
    [updateValue]
  );

  const handleRadioChange = useCallback(
    (event) => {
      const { name, value, checked } = event.target;
      if (checked) {
        updateValue(name, value);
      }
    },
    [updateValue]
  );

  return {
    values,
    setValues,
    updateValue,
    handleValueChange,
    handleCheckboxChange,
    handleRadioChange,
    reset
  };
}
