const template: string = `
{{#each items}}
<label class="{{classLabel}}" for="{{id}}">{{title}}</label>
<input class="{{classInput}}" type="{{type}}" name="{{name}}" id="{{id}}"></input>
{{/each}}
`;

export default template;
