const template: string = `
<div class='main__chat-wrapper'>
{{{logout}}}
{{{settings}}}
{{{form}}}
{{{getChats}}}
{{{chats}}}
</div>
{{{messages}}}
<div class="modal modal--nodisplay">
<div class="modal__content"
  {{{modalAdd}}}
</div>
</div>
`;

export default template;
