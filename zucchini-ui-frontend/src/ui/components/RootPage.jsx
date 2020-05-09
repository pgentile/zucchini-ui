import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import LoadingIndicator from "../../loadingIndicator/components/LoadingIndicator";
import ErrorAlertContainer from "../../errors/components/ErrorAlertContainer";

export default function RootPage({ search, children }) {
  return (
    <Fragment>
      <LoadingIndicator />

      <Navbar inverse staticTop collapseOnSelect>
        <Navbar.Brand>
          <Link to="/">Zucchini UI</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <Link to="/">Derniers tirs</Link>
            </NavItem>
          </Nav>
          {search}
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <ErrorAlertContainer />
        {children}
      </div>
    </Fragment>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
  search: PropTypes.node
};

function NavItem({ children }) {
  return <li>{children}</li>;
}

NavItem.propTypes = {
  children: PropTypes.node
};
