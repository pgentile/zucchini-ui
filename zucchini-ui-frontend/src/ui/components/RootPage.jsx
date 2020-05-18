import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import LoadingIndicator from "../../loadingIndicator/components/LoadingIndicator";
import ErrorAlertContainer from "../../errors/components/ErrorAlertContainer";

export default function RootPage({ children }) {
  return (
    <Fragment>
      <LoadingIndicator />

      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand as={Link} to="/">
          Zucchini UI
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Derniers tirs
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Container>
        <ErrorAlertContainer />
        {children}
      </Container>
    </Fragment>
  );
}

RootPage.propTypes = {
  children: PropTypes.node
};
