import { assert } from "chai";

import { HTTPTransport } from "./http";

describe("HTTPTransport", () => {
  const http = new HTTPTransport();
  it("Should exist", () => {
    assert.exists(http);
  });
});
