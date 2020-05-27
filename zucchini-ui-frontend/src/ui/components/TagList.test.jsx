import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import TagList from "./TagList";

describe("TagList", () => {
  it("should contain labels with tags", () => {
    const tags = ["A", "B", "C"];
    const testRunId = "sampleId";

    const component = renderer.create(
      <MemoryRouter>
        <TagList testRunId={testRunId} tags={tags} />
      </MemoryRouter>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
