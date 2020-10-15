import PropTypes from "prop-types";

export default function Page({ breadcrumb, title, mainline, children }) {
  return (
    <>
      {breadcrumb}
      <article>
        <header>
          <h1>{title}</h1>
          {mainline}
        </header>
        <hr />
        {children}
      </article>
    </>
  );
}

Page.propTypes = {
  breadcrumb: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  mainline: PropTypes.node,
  children: PropTypes.node.isRequired
};
