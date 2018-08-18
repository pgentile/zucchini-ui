import { expect } from "chai";

import html from "../../src/ui/html";

describe("html", () => {
  it("should escape template arguments", () => {
    const var1 = "<a href=\"toto\" target='tutu'>link</a>";
    const var2 = "& yo";

    const result = html`<span>${var1} ${var2}</span>`;
    expect(result).to.equal(
      "<span>&lt;a href=&quot;toto&quot; target=&#39;tutu&#39;&gt;link&lt;/a&gt; &amp; yo</span>"
    );
  });
});
