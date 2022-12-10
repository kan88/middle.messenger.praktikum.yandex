const template: string = `
    <ul class="messages__list">
      {{#each items}}
      <li class="messages__item">
        <span class="messages__date">{{time}}</span>
        <p class="messages__text">{{content}}</p>
      </li>
      {{/each}}
    </ul>`;
export default template;
