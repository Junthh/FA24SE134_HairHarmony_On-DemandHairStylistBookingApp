import React, { useEffect, useState } from 'react';
import { createContext, useContext, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { LOCAL_STORAGE_KEYS } from 'configurations/constants/globalConstants';
import { authService } from 'services/auth.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { CredentialInfo, Token } from 'models/CredentialInfo.model';
import { setCredentialInfo } from 'redux/Reducer';
import { AUTH_PATH } from 'configurations/paths/paths';

interface AuthContextValue {
  token: Token;
  saveToken: (data: Token) => void;
  logout: () => void;
}

// create context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function AuthProvider({ children }) {
  const redirectNonAuth = AUTH_PATH.LOGIN;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState<Token>(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AccessToken);
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.RefreshToken);

    return (accessToken && refreshToken && { accessToken, refreshToken }) || null;
  });

  const saveToken = (data: Token) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AccessToken, data.accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.RefreshToken, data.refreshToken);
    setToken(data);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    let path = redirectNonAuth;
    if (location.pathname.includes(AUTH_PATH.REGISTER)) {
      path = AUTH_PATH.REGISTER;
    }
    navigate(path, { replace: true });
  };

  useEffect(() => {
    if (token) {
      const { exp, email, role, id } = jwtDecode(token.accessToken) as any;

      if (Date.now() >= exp * 1000) {
        if (!token.refreshToken) {
          logout();
          return;
        }
        authService
          .refreshAccessToken({ refreshToken: token.refreshToken })
          .then((res) => {
            if (res) {
              localStorage.setItem(LOCAL_STORAGE_KEYS.AccessToken, res.data.accessToken);
              localStorage.setItem(LOCAL_STORAGE_KEYS.RefreshToken, res.data.refreshToken);
              setToken({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              });
            }
          })
          .catch((error) => {
            logout();
          });
      } else {
        const info: CredentialInfo = {
          acessToken: token.accessToken,
          refreshToken: token.refreshToken,
          email: email,
          role: role,
          id: id,
        };
        dispatch(setCredentialInfo<CredentialInfo>(info));
      }
    } else {
      logout();
    }
  }, [token?.accessToken, token?.refreshToken]);

  const value = useMemo(
    () => ({
      token,
      saveToken,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const AuthConsumer = () => {
  return useContext(AuthContext);
};
