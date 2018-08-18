import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import TagList from "../../../src/ui/components/TagList";
import Tag from "../../../src/ui/components/Tag";

describe("TagList", () => {
  it("should contain labels with tags", () => {
    const tags = ["A", "B", "C"];
    const testRunId = "sampleId";

    const wrapper = shallow(<TagList testRunId={testRunId} tags={tags} />);

    tags.forEach(tag => {
      expect(wrapper).to.contain(<Tag testRunId={testRunId} tag={tag} />);
    });
  });
});
