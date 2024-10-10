const { REACT_APP_API_BASE_URL, REACT_APP_PREFIX_API } = process.env;

type Environment = {
  apiUrl: string;
  prefixApi: string;
};

export const env: Environment = {
  apiUrl: REACT_APP_API_BASE_URL,
  prefixApi: REACT_APP_PREFIX_API || '/api'
};
