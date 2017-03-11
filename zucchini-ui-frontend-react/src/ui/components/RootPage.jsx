import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


export default function RoutePage({ children }) {
  return (
    <div>

      <Navbar inverse staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Zucchini UI &mdash; React</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem href="#">Derniers tirs</NavItem>
        </Nav>
      </Navbar>

      <div className="container">
        {children}
      </div>

    </div>
  );
}

RoutePage.propTypes = {
  children: React.PropTypes.node.isRequired,
};
