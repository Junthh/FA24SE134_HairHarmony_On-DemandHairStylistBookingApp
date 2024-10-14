export interface CredentialInfo {
  acessToken?: string;
  refreshToken?: string;
  id?: string;
  email?: string;
  role?: any;
}

export const CredentialInfoDefault = {
  acessToken: '',
  refreshToken: '',
};

export interface Token {
  accessToken: string;
  refreshToken: string;
}
