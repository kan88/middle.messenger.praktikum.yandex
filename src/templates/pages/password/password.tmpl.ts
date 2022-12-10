const template: string = `
<h2 class="title reg__title">{{title}}</h2>
{{{inputs}}}
{{{buttons}}}
<div class="error"></div>
`;

export default template;

// export default `<form class="form set">
//     {{> title label="Settings" class="title set__title" }}
//     <div class="set__input-wrapper">
//       <ul class="set__list">
//         <li class="set__item">
//           {{> input label="Avatar" classInput="input set__input set__input--avatar"
//           classLabel="label set__label"
//           name="avatar" type="file" id="first_name"}}
//         </li>
//         <li class="set__item">
//           {{> input label="First name" classInput="input set__input set__input--first-name"
//           classLabel="label
//           set__label"
//           name="first_name" type="text" id="first_name"}}
//         </li>
//         <li class="set__item">
//           {{> input label="Second name" classInput="input set__input set__input--second-name"
//           classLabel="label
//           set__label"
//           name="second_name" type="text" id="second_name"}}
//         </li>
//         <li class="set__item">
//           {{> input label="Nickname" classInput="input set__input set__input--display-name"
//           classLabel="label
//           set__label"
//           name="login" type="text" id="display_name"}}
//         </li>
//         <li class="set__item">
//           {{> input label="Login" classInput="input set__input set__input--login"
//           classLabel="label set__label"
//           name="login" type="text" id="login"}}
//         </li>
//         <li class="set__item">
//           {{> input label="Email" classInput="input set__input set__input--email"
//           classLabel="label set__label"
//           name="email" type="text" id="email"}}
//         </li>
//         <li class="set__item">
//           {{> input label="Phone" classInput="input set__input set__input--phone"
//           classLabel="label set__label"
//           name="phone" type="text" id="phone"}}
//         </li>
//         <li class="set__item">
//           {{> input label="New password" classInput="input set__input set__input--password-new"
//           classLabel="label
//           set__label"
//           name="password_new" type="text" id="password_new"}}
//         </li>
//         <li class="set__item">
//           {{> input label="Old password" classInput="input set__input set__input--password"
//           classLabel="label
//           set__label"
//           name="password" type="text" id="password"}}
//         </li>

//       </ul>

//     </div>
//     <div class="auth__btn-wrapper">
//       {{> button label="Save information" class="btn btn--save" }}
//     </div>
//   </form>`;
