const template: string = `
<input class='{{classinput}}' name='{{title}}' placeholder="{{placeholder}}" required>
<input type="hidden" name="message">
<input type="submit" title="{{titleSubmit}}" class="{{classSubmit}}">
`;

export default template;
