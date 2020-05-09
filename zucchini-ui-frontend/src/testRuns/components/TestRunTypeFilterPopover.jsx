import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";

import { selectTestRunTypes } from "../selectors";

export default function TestRunTypeFilterPopover({ selectedType, onTypeSelected }) {
  const [search, setSearch] = useState("");

  const testRunTypes = useSelector(selectTestRunTypes);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleTypeSelected = () => {
    onTypeSelected();
  };

  const createFilter = () => {
    if (search) {
      const searchLowerCase = search.toLowerCase();
      return (type) => type.toLowerCase().includes(searchLowerCase);
    }

    return () => true;
  };

  // Any type link

  let allTypesLink = (
    <Link to="/" onClick={handleTypeSelected}>
      <i>Tous les types</i>
    </Link>
  );
  if (!selectedType) {
    allTypesLink = <b>{allTypesLink}</b>;
  }

  // Links to test run types

  const testRunTypeLinks = testRunTypes.filter(createFilter()).map((type) => {
    return (
      <p key={type}>
        <Link to={{ pathname: "/", search: queryString.stringify({ type }) }} onClick={handleTypeSelected}>
          {type === selectedType ? <b>{type}</b> : type}
        </Link>
      </p>
    );
  });

  return (
    <div>
      <FormGroup bsSize="small">
        <FormControl
          type="text"
          placeholder="Rechercher un type de tir"
          value={search}
          onChange={handleSearch}
          autoFocus
        />
      </FormGroup>

      <p>{allTypesLink}</p>
      {testRunTypeLinks.length > 0 ? (
        testRunTypeLinks
      ) : (
        <p>
          <i>Aucun type trouvé</i>
        </p>
      )}
    </div>
  );
}

TestRunTypeFilterPopover.propTypes = {
  selectedType: PropTypes.string,
  onTypeSelected: PropTypes.func.isRequired
};
