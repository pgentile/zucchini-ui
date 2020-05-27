import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  it("should scroll to top", async () => {
    window.scrollTo = jest.fn().mockName("scrollTo");

    const { getByText } = render(
      <>
        <ScrollToTop />
        <Link to="/new-page">Change page</Link>
      </>,
      { wrapper: MemoryRouter }
    );

    expect(window.scrollTo).toHaveBeenCalled();

    fireEvent.click(getByText("Change page"));

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
