const template: string = `
<h2 class="title reg__title">{{title}}</h2>
<ul class="user__list">
<li class="user__item user__item--avatar">
<img src="{{avatar}}" width="150" height="150" alt="avatar">
</li>
<li class="user__item user__item--nick">Nickname:{{nick}}</li>
<li class="user__item user__item--first">Firstname:{{first}}</li>
<li class="user__item user__item--second">Secondname:{{second}}</li>
<li class="user__item user__item--id">Id:{{id}}</li>
<li class="user__item user__item--email">Email:{{email}}</li>
<li class="user__item user__item--phone">Phone:{{phone}}</li>
<li class="user__item user__item--login">Login:{{login}}</li>
</ul>
{{{links}}}
`;

export default template;
