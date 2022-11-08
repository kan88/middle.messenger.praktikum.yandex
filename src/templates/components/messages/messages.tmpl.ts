const template: string = `
<div class="main__chat">
  <div class="messages">
    <ul class="messages__list">
      {{#each items}}
      <li class="{{class}}">
        <span class="messages__date">{{date}}</span>
        <p class="messages__text">{{text}}</p>
      </li>
      {{/each}}
    </ul>
    <label="messages__label" for="message">
    <input class="messages__input" name="message" type="text" id="message" required>
  </div>
</div>`;


export default template;
