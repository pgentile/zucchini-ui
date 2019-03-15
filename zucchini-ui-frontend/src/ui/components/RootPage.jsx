import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import { Link } from "react-router-dom";

import LoadingIndicatorContainer from "../../loadingIndicator/components/LoadingIndicatorContainer";
import ErrorAlertContainer from "../../errors/components/ErrorAlertContainer";

export default function RoutePage({ search, children }) {
  return (
    <Fragment>
      <LoadingIndicatorContainer />

      <Navbar inverse staticTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Zucchini UI</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
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

RoutePage.propTypes = {
  children: PropTypes.node,
  search: PropTypes.node
};

function NavItem({ children }) {
  return <li>{children}</li>;
}

NavItem.propTypes = {
  children: PropTypes.node
};
