import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  COMMON_CONSTANTS,
  ENDPOINTS,
  LOCAL_STORAGE_KEYS,
} from 'configurations/constants/globalConstants';
import { AuthConsumer } from 'pages/Auth/AuthProvider';
import { authService } from 'services/auth.service';
import { AUTH_PATH } from 'configurations/paths/paths';

function Interceptor() {
  const authContext = AuthConsumer();

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  // Handle function
  const onRequestSuccess = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AccessToken);
    config.headers.Authorization = token && token.length ? `Bearer ${token}` : '';
    return config;
  };

  const onRequestError = (error) => {
    return Promise.reject(error);
  };

  const onResponseSuccess = (response: AxiosResponse) => {
    return Promise.resolve(response.data);
  };

  const onResponseError = (error: AxiosError) => {
    if (error?.response?.status.toString().startsWith(COMMON_CONSTANTS.PrefixServerError)) {
      return Promise.reject({
        code: error.response.status,
        message: 'Internal Server Error!!!',
      });
    }

    const originalRequest = error.config as any;
    const errMessage = error.response?.data || error?.response || error;

    // Check 401 status code with refresh token api
    if (
      error?.response?.status === 401 &&
      originalRequest.url.includes(`${AUTH_PATH.REFRESH_TOKEN}`)
    ) {
      processQueue(error, null);
      localStorage.clear();
      window.location.replace(AUTH_PATH.LOGIN);
    }

    // Check status request failed to refresh token
    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        const refreshAccessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.RefreshToken);
        if (!refreshAccessToken) {
          return reject(errMessage);
        }

        return authService
          .refreshAccessToken({ refreshToken: refreshAccessToken })
          .then(({ data }) => {
            if (data && data.accessToken) {
              authContext.saveToken({
                token: data.accessToken,
                refreshToken: data.refreshToken,
              });
              axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
              processQueue(null, data.accessToken);
              resolve(axios(originalRequest));
            } else {
              authContext.logout();
              reject({ code: 401, message: 'Unauthorized' });
            }
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(errMessage);
  };

  // Handle axios default config
  axios.defaults.baseURL = `${ENDPOINTS.ApiBaseUrl}`;

  // Handle axios request
  axios.interceptors.request.use(onRequestSuccess, onRequestError);

  // Handle axios response
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}

export default Interceptor;
