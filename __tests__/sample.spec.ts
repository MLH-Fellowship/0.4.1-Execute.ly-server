import { sampleFunction } from "../src/sample";

describe("This is a simple test", () => {
  test("Check the sampleFunction function", () => {
    const actual = sampleFunction("hello");
    // debugger
    expect(actual).toEqual("hellohello");
  });
});
