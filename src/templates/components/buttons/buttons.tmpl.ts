const template: string = `
{{#each items}}
<button class="{{class}}" type="{{type}}">{{title}}</button>
{{/each}}
`;

export default template;