import Block from "./Block";
import isBlock from "./isBlock";

export default function isBlockArray(value: unknown): value is Block[] {
  let res: boolean;
  if (Array.isArray(value)) {
    res = value.every(isBlock);
  }
  else {
    res = false;
  }
  return res;
}
