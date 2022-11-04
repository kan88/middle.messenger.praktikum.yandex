export default `<form class="form reg">
  {{> title label="Registration" class="title reg__title" }}
  <div class="reg__input-wrapper">
    <ul class="reg__list">
      <li class="reg__item">
        {{> input label="First name" classInput="input reg__input reg__input--first-name"
        classLabel="label
        reg__label"
        name="first_name" type="text" id="first_name"}}
      </li>
      <li class="reg__item">
        {{> input label="Second name" classInput="input reg__input reg__input--second-name"
        classLabel="label
        reg__label"
        name="second_name" type="text" id="second_name"}}
      </li>
      <li class="reg__item">
        {{> input label="Login" classInput="input reg__input reg__input--login"
        classLabel="label reg__label"
        name="login" type="text" id="login"}}
      </li>
      <li class="reg__item">
        {{> input label="Email" classInput="input reg__input reg__input--email"
        classLabel="label reg__label"
        name="email" type="text" id="email"}}
      </li>
      <li class="reg__item">
        {{> input label="Phone" classInput="input reg__input reg__input--phone"
        classLabel="label reg__label"
        name="phone" type="text" id="phone"}}
      </li>
      <li class="reg__item">
        {{> input label="Password" classInput="input reg__input reg__input--password"
        classLabel="label reg__label"
        name="password" type="text" id="password"}}
      </li>
    </ul>

  </div>
  <div class="auth__btn-wrapper">
    {{> button label="Create profile" class="btn btn--sub" }}
  </div>
</form>`;
