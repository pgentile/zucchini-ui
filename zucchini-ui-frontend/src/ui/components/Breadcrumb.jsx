import PropTypes from "prop-types";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { default as BootstrapBreadcrumb } from "react-bootstrap/Breadcrumb";

function Breadcrumb({ items }) {
  const elements = items.map((item, index) => {
    const active = index + 1 === items.length;
    return (
      <BootstrapBreadcrumb.Item key={index} active={active} linkAs={active ? null : Link} linkProps={{ to: item.link }}>
        {item.value}
      </BootstrapBreadcrumb.Item>
    );
  });

  return <BootstrapBreadcrumb>{elements}</BootstrapBreadcrumb>;
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default memo(Breadcrumb);
