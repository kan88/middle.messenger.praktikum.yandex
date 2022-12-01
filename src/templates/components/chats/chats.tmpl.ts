const template: string = `
<div class="main__chat">
  <div class="chat">
    <ul class="chat__list">
      {{#each items}}
        <li class="{{class}}" data-id="{{id}}">
          <div class="chat__wrapper">
              <h3 class="chat__name">{{title}}</h3>
              <span class="chat__date">{{id}}</span>
          </div>
          <p class="chat__message">{{created_by}}</p>
          <button class="plus">+</button>
        </li>
      {{/each}}
    </ul>
  </div>
</div>`;

export default template;
