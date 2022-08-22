import { MemoryRouter, Link } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  let realScrollTo;

  beforeAll(() => {
    realScrollTo = window.scrollTo;
  });

  beforeEach(() => {
    window.scrollTo = jest.fn().mockName("scrollTo");
  });

  afterEach(() => {
    window.scrollTo = realScrollTo;
  });

  it("should scroll to top", () => {
    render(
      <>
        <ScrollToTop />
        <Link to="/new-page">Change page</Link>
      </>,
      { wrapper: MemoryRouter }
    );

    expect(window.scrollTo).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Change page"));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });

  it("should not scroll to top if location state says so", () => {
    render(
      <>
        <ScrollToTop />
        <Link to="/new-page" state={{ scrollToTop: false }}>
          Change page
        </Link>
      </>,
      { wrapper: MemoryRouter }
    );

    expect(window.scrollTo).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Change page"));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
