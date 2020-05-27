import React from "react";
import { render } from "@testing-library/react";

import ListWithSeparator from "./ListWithSeparator";

describe("ListWithSeparator", () => {
  it("should not use separator for no element", () => {
    const { asFragment } = render(<ListWithSeparator separator="-" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not use separator for just one element", () => {
    const { asFragment } = render(
      <ListWithSeparator separator="-">
        <span>Item 1</span>
      </ListWithSeparator>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should use separator for many elements", () => {
    const { asFragment } = render(
      <ListWithSeparator separator="-">
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
      </ListWithSeparator>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should use separator tag for many elements", () => {
    const { asFragment } = render(
      <ListWithSeparator separator={<span>/</span>}>
        <span>Item 1</span>
        <span>Item 2</span>
      </ListWithSeparator>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
