const template: string = `
<input class='modal__input modal__input--userid' name='users' required placeholder="id user">
<input type="hidden" class='modal__input modal__input--chatid'
name='chatId' required placeholder="id chat">
<button type="submit" class="modal__submit set__link">Add User</button>
<button type="reset" class="modal__reset set__link">Close</button>
<button type="reset" class="modal__remove set__link">Remove User</button>
`;

export default template;
