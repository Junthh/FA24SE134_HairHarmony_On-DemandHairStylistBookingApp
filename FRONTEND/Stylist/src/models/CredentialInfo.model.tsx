export interface CredentialInfo {
  Username?: string;
  Email?: string;
  PhoneNumber?: string;
  Id?: string;
  Role?: string;
  nbf?: number;
  exp?: number;
  iss?: string;
  aud?: string;
  acessToken?: string;
  refreshToken?: string;
}

export const CredentialInfoDefault = {
  acessToken: '',
  refreshToken: '',
};

export interface Token {
  token: string;
  refreshToken: string;
}
