const template: string = `
<div class='main__chat-wrapper'>
{{{logout}}}
{{{settings}}}
<form class='main__chat-form'>
<input class='main__chat-input' name='title' required>
{{{newChat}}}
</form>
{{{getChats}}}
{{{chats}}}
</div>
{{{messages}}}
`;

export default template;
