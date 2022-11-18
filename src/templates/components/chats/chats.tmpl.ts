const template: string = `
<div class="main__chat">
  <div class="chat">
    <ul class="chat__list">
      {{#each items}}
        <li class="{{class}}">
          <div class="chat__wrapper">
              <h3 class="chat__name">{{name}}</h3>
              <span class="chat__date">{{date}}</span>
          </div>
          <p class="chat__message">{{message}}</p>
        </li>
      {{/each}}
    </ul>
  </div>
</div>`;

export default template;
