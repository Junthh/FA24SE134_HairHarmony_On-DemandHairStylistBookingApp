export interface RefreshAccessTokenPayload {
  refreshToken: string;
}

export interface RegisterPayload {
  phoneNumber: string;
  fullName: string;
  password: string;
}

export interface LoginPayLoad {
  phoneNumber: string;
  password: string;
}
