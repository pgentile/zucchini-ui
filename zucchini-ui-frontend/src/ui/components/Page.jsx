import PropTypes from "prop-types";
import React from "react";

export default function Page({ breadcrumb, title, mainline, children }) {
  return (
    <>
      {breadcrumb}
      <h1>{title}</h1>
      {mainline}
      <hr />
      {children}
    </>
  );
}

Page.propTypes = {
  breadcrumb: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  mainline: PropTypes.node,
  children: PropTypes.node.isRequired
};
