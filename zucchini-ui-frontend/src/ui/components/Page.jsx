import PropTypes from "prop-types";
import React from "react";

import ErrorBarrier from "./ErrorBarrier";

export default function Page({ breadcrumb, title, mainline, children }) {
  return (
    <ErrorBarrier>
      {breadcrumb}
      <h1>{title}</h1>
      {mainline}
      <hr />
      <ErrorBarrier>{children}</ErrorBarrier>
    </ErrorBarrier>
  );
}

Page.propTypes = {
  breadcrumb: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  mainline: PropTypes.node,
  children: PropTypes.node.isRequired
};
