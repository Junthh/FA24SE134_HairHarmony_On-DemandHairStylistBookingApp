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
  register = (payload: FormData) => {
    return axios({
      url: `${ENDPOINTS.ApiPrefix}/Customers`,
      method: 'POST',
      data: payload,
    });
  };
  login = async (payload: LoginPayLoad) => {
    return await axios({
      url: `${ENDPOINTS.ApiPrefix}/Customers/login`,
      method: 'POST',
      data: payload,
    });
  };
  findById = async (id: string) => {
    return await axios({
      url: `${ENDPOINTS.ApiPrefix}/Customers/${id}`,
      method: 'GET',
    });
  };
  update = async (id: string, body: FormData) => {
    return await axios({
      url: `${ENDPOINTS.ApiPrefix}/Customers/${id}`,
      method: 'PUT',
      data: body,
    });
  };
  changePassword = async (id: string, body: FormData) => {
    return await axios({
      url: `${ENDPOINTS.ApiPrefix}/Customers/${id}/changePassword`,
      method: 'PUT',
      data: body,
    });
  };
}

export const authService = new AuthService();
