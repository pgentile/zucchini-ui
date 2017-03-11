import React from 'react';


export default function BasePage({ children, title }) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

BasePage.propTypes = {
  children: React.PropTypes.node.isRequired,
  title: React.PropTypes.string.isRequired,
};
