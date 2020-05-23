import PropTypes from "prop-types";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import LoadingIndicator from "../../loadingIndicator/components/LoadingIndicator";
import ErrorAlert from "../../errors/components/ErrorAlert";
import ErrorBarrier from "./ErrorBarrier";

export default function RootPage({ children }) {
  return (
    <>
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
        <ErrorBarrier className="my-4" name="Root page">
          <ErrorAlert />
          {children}
        </ErrorBarrier>
      </Container>
    </>
  );
}

RootPage.propTypes = {
  children: PropTypes.node
};
