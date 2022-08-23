import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";

import Button from "../../ui/components/Button";
import { setTagFilter } from "../redux";

export default function TagFilterForm() {
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  const updateStoreFilter = useMemo(() => {
    const dispatchFilterChange = (filter) => dispatch(setTagFilter({ filter }));
    return debounce(dispatchFilterChange, 200);
  }, [dispatch]);

  const updateFilter = useCallback(
    (filter, immediate = false) => {
      setFilter(filter);
      updateStoreFilter(filter);
      if (immediate) {
        updateStoreFilter.flush();
      }
    },
    [updateStoreFilter]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    updateFilter(filter, true);
  };

  const handleFilterChange = (event) => {
    updateFilter(event.target.value);
  };

  const handleFilterClear = () => {
    updateFilter("", true);
  };

  useEffect(() => {
    return () => updateFilter("", true);
  }, [updateFilter]);

  const tagControlId = useId();

  return (
    <Form onSubmit={handleSubmit} data-testid="tag-filter-form">
      <FormGroup controlId={tagControlId}>
        <InputGroup size="lg">
          <FormLabel srOnly>Tag</FormLabel>
          <FormControl
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Entrez les premières lettres d'un tag&hellip;"
          />
          <InputGroup.Append>
            <Button variant="secondary" icon={faTimesCircle} iconOnly onClick={handleFilterClear}>
              Effacer
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </FormGroup>
    </Form>
  );
}
