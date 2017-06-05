import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import { Link } from 'react-router';

import ErrorAlertContainer from '../../errors/components/ErrorAlertContainer';
import LoadingIndicatorContainer from '../../loadingIndicator/components/LoadingIndicatorContainer';


export default function RoutePage({ main, breadcrum, search }) {
  return (
    <div>
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
        {breadcrum}
        {main}
      </div>

    </div>
  );
}

RoutePage.propTypes = {
  main: PropTypes.node.isRequired,
  breadcrum: PropTypes.node,
  search: PropTypes.node,
};


function NavItem({ children }) {
  return (
    <li>
      {children}
    </li>
  );
}

NavItem.propTypes = {
  children: PropTypes.node,
};
