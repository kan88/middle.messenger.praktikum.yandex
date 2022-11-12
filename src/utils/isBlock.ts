import Block from './Block';

export default function isBlock(value: unknown): value is Block {
  return value instanceof Block;
}
