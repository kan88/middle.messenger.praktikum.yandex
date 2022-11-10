const View = {
  showError(evt: any, message: string): void | null {
    if (evt instanceof Element) {
      evt.nextSibling.textContent = message;
      evt.nextSibling.style.color = 'red';
    } else {
      evt.target.nextSibling.textContent = message;
      evt.nextSibling.style.color = 'red';
    }
  },
  hideError(evt: any): void | null {
    if (evt instanceof Element) {
      evt.nextSibling.textContent = '';
    } else {
      evt.target.nextSibling.textContent = '';
    }
  },
};

export default View;
