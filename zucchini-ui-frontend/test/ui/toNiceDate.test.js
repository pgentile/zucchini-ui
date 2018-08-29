import toNiceDate from "../../src/ui/toNiceDate";

describe("toNiceDate", () => {
  it("should return null for a null input", () => {
    const result = toNiceDate(null);
    expect(result).toBeNull();
  });

  it("should return nice date for an ISO date", () => {
    const result = toNiceDate("2017-04-30T18:34:52");
    expect(result).toEqual("30/04/2017 à 18:34");
  });
});
