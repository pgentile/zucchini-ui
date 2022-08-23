import { useId, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

import useQueryParams from "../../useQueryParams";
import { useSelector } from "react-redux";
import { selectTestRunTypes } from "../selectors";

export default function TestRunTypeFilter() {
  const { type: selectedType } = useQueryParams();

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const dropdownId = useId();

  // Links to test run types

  const testRunTypes = useSelector(selectTestRunTypes);

  const testRunTypeLinks = testRunTypes.filter(createFilter(search)).map((type) => {
    return (
      <Dropdown.Item
        key={type}
        active={type === selectedType}
        as={MenuLink}
        to={{
          pathname: "/",
          search: queryString.stringify({ type })
        }}
      >
        {type}
      </Dropdown.Item>
    );
  });
  return (
    <ButtonGroup className="mb-3">
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" size="sm" id={dropdownId} disabled={testRunTypes.length === 0}>
          Type de tir : <b>{selectedType ? selectedType : <i>Tous</i>}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form>
            <FormGroup size="sm" className="mx-2 mb-2">
              <FormControl
                aria-label="Filtre de type de tir"
                type="text"
                placeholder="Rechercher un type de tir"
                value={search}
                onChange={handleSearch}
              />
            </FormGroup>
          </Form>
          <Dropdown.Divider />
          {!search && (
            <>
              <Dropdown.Item active={!selectedType} as={MenuLink} to="/">
                Tous les types
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}
          {testRunTypeLinks}
          {testRunTypeLinks.length === 0 && <span className="dropdown-item-text text-muted">Aucun type trouvé</span>}
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
}

function MenuLink({ children, to, className, onClick }) {
  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

MenuLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

function createFilter(search) {
  if (search) {
    const searchLowerCase = search.toLowerCase();
    return (type) => type.toLowerCase().includes(searchLowerCase);
  }

  return () => true;
}
