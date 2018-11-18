import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, Route } from "react-router-dom";

import TagList from "../../../src/ui/components/TagList";

describe("TagList", () => {
  it("should contain labels with tags", () => {
    const tags = ["A", "B", "C"];
    const testRunId = "sampleId";

    const component = renderer.create(
      <BrowserRouter>
        <TagList testRunId={testRunId} tags={tags} />
      </BrowserRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
