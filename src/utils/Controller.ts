import View from './View';
import isValid from './isValid';
import isSubmit from './isSubmit';
import router from '../templates/pages/auth/index';

const Controller = {
  // sendConsole(): any {
  //   document.querySelectorAll('INPUT').forEach((item: Element) => void {
  //     console.log((item as HTMLInputElement).value)
  //   })
  // },
  onValidate(evt: Event): any {
    evt.preventDefault();
    if (isValid(evt)) {
      View.showError(evt, isValid(evt));
    } else {
      View.hideError(evt);
    }
  },
  onSubmit(evt: Event): void {
    evt.preventDefault();
    const inputs = document.querySelectorAll('INPUT');
    inputs.forEach((input) => {
      if (isSubmit(input)) {
        View.showError(input, isValid(input));
        return;
      }
      return true;
    });
  },
  onGo(evt: Event): void {
    evt.preventDefault();
    router.go(evt.target.href.split('*')[1]);
  },
};
export const validationHandler = (evt: Event) => Controller.onValidate(evt);
export const submitHandler = (evt: Event) => Controller.onSubmit(evt);
export const goHandler = (evt: Event) => Controller.onGo(evt);
