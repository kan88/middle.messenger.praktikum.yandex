import Block from "./block";

export default function renderDOM(query: string, block: Block): Element | null {
  const root: Element | null = document.querySelector(query);
  if (!root) {
    console.log("root not found:");
    console.log(root);
    return null;
  }
  const content: HTMLElement = block.getContent();   //Node == base
  root.appendChild(content);
  block.dispatchComponentDidMount();

  return root;
}
