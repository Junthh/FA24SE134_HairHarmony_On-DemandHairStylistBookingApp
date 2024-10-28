import axios from 'axios';
import { ECOCUPID_ENDPOINTS } from 'configurations/constants/globalConstants';
import { LoginPayLoad, RefreshAccessTokenPayload, RegisterPayload } from 'models/Request.model';

class AuthService {
  refreshAccessToken = (payload: RefreshAccessTokenPayload) => {
    return axios({
      url: `${ECOCUPID_ENDPOINTS.ApiPrefix}/auth/refresh`,
      method: 'GET',
      data: payload,
    });
  };
  register = (payload: RegisterPayload) => {
    return axios({
      url: `${ECOCUPID_ENDPOINTS.ApiPrefix}/Staffs/regist`,
      method: 'POST',
      data: payload,
    });
  };
  login = async (payload: LoginPayLoad) => {
    return await axios({
      url: `${ECOCUPID_ENDPOINTS.ApiPrefix}/Staffs/login`,
      method: 'POST',
      data: payload,
    });
  };
}

export const authService = new AuthService();
