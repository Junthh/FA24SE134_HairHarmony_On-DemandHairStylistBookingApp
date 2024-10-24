import axios from 'axios';
import { ENDPOINTS } from 'configurations/constants/globalConstants';
import { LoginPayLoad, RefreshAccessTokenPayload, RegisterPayload } from 'models/Request.model';

class AuthService {
  refreshAccessToken = (payload: RefreshAccessTokenPayload) => {
    return axios({
      url: `${ENDPOINTS.ApiPrefix}/auth/refresh`,
      method: 'GET',
      data: payload,
    });
  };
  register = (payload: RegisterPayload) => {
    return axios({
      url: `${ENDPOINTS.ApiPrefix}/users/regist`,
      method: 'POST',
      data: payload,
    });
  };
  login = async (payload: LoginPayLoad) => {
    return await axios({
      url: `${ENDPOINTS.ApiPrefix}/users/login`,
      method: 'POST',
      data: payload,
    });
  };
}

export const authService = new AuthService();
