const template: string = `
    <ul class="messages__list">
      {{#each items}}
      <li class="{{class}}">
        <span class="messages__date">{{date}}</span>
        <p class="messages__text">{{text}}</p>
      </li>
      {{/each}}
    </ul>
    <input class="messages__input" name="message" type="text" id="message" required>`;

export default template;
