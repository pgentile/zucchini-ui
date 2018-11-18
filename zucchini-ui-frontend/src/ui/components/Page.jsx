import PropTypes from "prop-types";
import React, { Fragment } from "react";

export default function Page({ title, breadcrumb, children }) {
  return (
    <Fragment>
      {breadcrumb}
      <h1>{title}</h1>
      <hr />
      {children}
    </Fragment>
  );
}

Page.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  breadcrumb: PropTypes.node.isRequired
};
