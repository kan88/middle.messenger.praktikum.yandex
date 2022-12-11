import { expect } from "chai";

describe("Router", () => {
  it("Переход меняет history", () => {
    window.history.pushState({ page: "log" }, "Log", "/log");
    window.history.pushState({ page: "reg" }, "Reg", "/reg");
    expect(window.history.length).to.eq(3);
  });
});
