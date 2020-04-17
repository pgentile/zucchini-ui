import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import queryString from "query-string";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";

export default class TestRunTypeFilterPopover extends React.PureComponent {
  static propTypes = {
    testRunTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedType: PropTypes.string,
    onTypeSelected: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  onSearch = (event) => {
    this.setState({
      search: event.target.value
    });
  };

  onTypeSelected = () => {
    this.props.onTypeSelected();
  };

  createFilter() {
    const { search } = this.state;

    if (search) {
      const searchLowerCase = search.toLowerCase();
      return (type) => type.toLowerCase().includes(searchLowerCase);
    }

    return () => true;
  }

  render() {
    const { testRunTypes, selectedType } = this.props;

    // Any type link

    let allTypesLink = (
      <Link to="/" onClick={this.onTypeSelected}>
        <i>Tous les types</i>
      </Link>
    );
    if (selectedType === "" || selectedType === null) {
      allTypesLink = <b>{allTypesLink}</b>;
    }

    // Links to test run types

    const testRunTypeLinks = testRunTypes.filter(this.createFilter()).map((type) => {
      return (
        <p key={type}>
          <Link to={{ pathname: "/", search: queryString.stringify({ type }) }} onClick={this.onTypeSelected}>
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
            value={this.state.search}
            onChange={this.onSearch}
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
}
