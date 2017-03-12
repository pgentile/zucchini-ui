import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import { Link } from 'react-router';


export default function RoutePage({ main, breadcrum, search }) {
  return (
    <div>
      <Navbar inverse staticTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Zucchini UI &mdash; <i>React</i></Link>
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
        {breadcrum}
        {main}
      </div>

    </div>
  );
}

RoutePage.propTypes = {
  main: React.PropTypes.node.isRequired,
  breadcrum: React.PropTypes.node.isRequired,
  search: React.PropTypes.node,
};


function NavItem({ children }) {
  return (
    <li>
      {children}
    </li>
  );
}

NavItem.propTypes = {
  children: React.PropTypes.node,
};
