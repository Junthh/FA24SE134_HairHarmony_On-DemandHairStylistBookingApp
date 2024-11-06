export interface CredentialInfo {
  acessToken?: string;
  refreshToken?: string;
  Username?: string;
  Email?: string;
  PhoneNumber?: string;
  Id?: string;
  Role?: string;
  nbf?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export const CredentialInfoDefault = {
  acessToken: '',
  refreshToken: '',
};

export interface Token {
  token: string;
  refreshToken: string;
}
