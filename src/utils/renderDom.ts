import Block from "./block";

export default function renderDOM(query: string, block: Block): Element | null {
  const root: Element | null = document.querySelector(query);
  if (!root) {
    return null;
  }
  const content: HTMLElement = block.getContent();
  root.appendChild(content);
  block.dispatchComponentDidMount();

  return root;
}
