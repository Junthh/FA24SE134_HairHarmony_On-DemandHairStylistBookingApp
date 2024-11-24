export interface CredentialInfo {
  accessToken?: string;
  refreshToken?: string;
  Username?: string;
  FullName?: string;
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
  accessToken: '',
  refreshToken: '',
};

export interface Token {
  token: string;
  refreshToken: string;
}
