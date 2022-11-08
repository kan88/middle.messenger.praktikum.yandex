const template: string = `
{{#each items}}
<a href="{{url}}" class="{{class}}">{{title}}</a>
{{/each}}
`;

export default template;