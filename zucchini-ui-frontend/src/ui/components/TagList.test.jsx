import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import TagList from "./TagList";

describe("TagList", () => {
  it("should contain labels with tags", () => {
    const tags = ["C", "A", "B"];
    const testRunId = "sampleId";

    render(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <TagList testRunId={testRunId} tags={tags} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "@A" })).toHaveAttribute("href", "/test-runs/sampleId/tag-details?tag=A");
    expect(screen.getByRole("link", { name: "@B" })).toHaveAttribute("href", "/test-runs/sampleId/tag-details?tag=B");
    expect(screen.getByRole("link", { name: "@C" })).toHaveAttribute("href", "/test-runs/sampleId/tag-details?tag=C");

    expect(screen.getAllByRole("link").map((link) => link.textContent)).toEqual(["@A", "@B", "@C"]);
  });
});
