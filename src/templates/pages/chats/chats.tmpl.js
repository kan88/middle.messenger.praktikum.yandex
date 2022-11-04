export default `
<div class="main__chat">
  <div class="chat">
    <ul class="chat__list">
      {{> chatItem class="chat__item chat__item--actual" name="Harry"
      date="12.10.22" message="Hi there" }}
      {{> chatItem class="chat__item" name="Hermiona" date="11.10.22" message="Good luck" }}
      {{> chatItem class="chat__item" name="Rone" date="10.10.22" message="ok" }}
    </ul>
    {{> link label="Settings" class="chat__item chat__item--settings"
    link="../set/set.html" }}
  </div>
  <div class="messages">
    <ul class="messages__list">
      {{> messagesItem date="12.10.22 08:30" text="Hi there" class="messages__item--user"}}
      {{> messagesItem date="12.10.22 08:40" text="Hi my friend" class="messages__item--opponent"}}
      {{> messagesItem date="12.10.22 08:40" text="How are you" class="messages__item--opponent"}}
    </ul>
    {{> input classInput="messages__input" classLabel="messages__label"
    name="message" type="text" id="message"}}
  </div>
</div>`;
