import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import TagList from "./TagList";

describe("TagList", () => {
  it("should contain labels with tags", () => {
    const tags = ["A", "B", "C"];
    const testRunId = "sampleId";

    const { asFragment } = render(
      <MemoryRouter>
        <TagList testRunId={testRunId} tags={tags} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
