import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import queryString from "query-string";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import useQueryParams from "../../useQueryParams";
import Button from "../../ui/components/Button";
import useUniqueId from "../../useUniqueId";

export default function SearchForm() {
  const history = useHistory();
  const { testRunId } = useParams();
  const queryParams = useQueryParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(queryParams.search ?? "");
  }, [queryParams]);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push({
      pathname: `/test-runs/${testRunId}/search`,
      search: queryString.stringify({
        search
      })
    });
  };

  const searchControlId = useUniqueId();

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId={searchControlId}>
        <InputGroup size="lg">
          <FormControl type="text" value={search} onChange={handleSearchChange} placeholder="Rechercher&hellip;" />
          <InputGroup.Append>
            <Button icon={faSearch} type="submit">
              Rechercher
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </FormGroup>
    </Form>
  );
}
