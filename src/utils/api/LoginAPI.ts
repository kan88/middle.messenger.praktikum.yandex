class LoginAPI extends BaseAPI {
  public request(user: LoginRequest) {
    return authAPIInstance.post<LoginRequest, LoginResponse>('/login', user)
      .then(({ user_id }) => user_id); // Обрабатываем получение данных из сервиса далее
  }
}

interface LoginFormModel {
  email: string;
  password: string;
}

const loginApi = new LoginAPI();
const userLoginValidator = validateLoginFields(validateRules);

class UserLoginController {
  public async login(data: LoginFormModel) {
    try {
      // Запускаем крутилку

      const validateData = userLoginValidator(data);

      if (!validateData.isCorrect) {
        throw new Error(validateData);
      }

      const userID = loginApi.request(prepareDataToRequest(data));

      RouteManagement.go('/chats');

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
}
