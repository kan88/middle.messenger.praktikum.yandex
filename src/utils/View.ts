const View = {
  showError(message: string): void | null {
    const root: Element | null = document.querySelector('.error');
    if (!root) {
      return null;
    }
    root.textContent = message;
  },
  hideError(): void | null {
    const root: Element | null = document.querySelector('.error');
    if (!root) {
      return null;
    }
    root.textContent = '';
  },
};

export default View;
