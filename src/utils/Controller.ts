import View from './View';
import isValid from './isValid';
import isSubmit from './isSubmit';

const Controller = {
  // sendConsole(): any {
  //   document.querySelectorAll('INPUT').forEach((item: Element) => void {
  //     console.log((item as HTMLInputElement).value)
  //   })
  // },
  onValidate(evt: any): any {
    evt.preventDefault();
    if (isValid(evt)) {
      View.showError(isValid(evt));
    } else {
      View.hideError();
    }
  },
  onSubmit(evt: any): void {
    evt.preventDefault();
    const inputs = document.querySelectorAll('INPUT');
    inputs.forEach((input) => {
      if (isSubmit(input)) {
        View.showError(isValid(evt));
        return
      }
      console.log(input.value)
    });
  },
};

export default Controller;
