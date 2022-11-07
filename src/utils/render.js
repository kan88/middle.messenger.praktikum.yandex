const render = (selector, component) => {
  const root = document.querySelector(selector);
  if (!selector) {
    return;
  }

  root.appendChild(component.getContent());
  return root;
};

export {
  render,
};
