import { assert } from 'chai';
import Block from './block';


describe("Block", () => {
  const block = new Block();
  it("Should exist", () => {
    assert.exists(block);
  });
});
