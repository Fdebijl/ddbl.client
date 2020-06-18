type DatasetEndpoint =
  'article/'

type AccountEndpoint =
  'account/' |
  'auth/login' |
  'account/logout'

export type Endpoint = AccountEndpoint | DatasetEndpoint | string;


export const Endpoints: {
  account: 'account/';
  accountLogin: 'auth/login';
  accountLogout: 'account/logout';
  dataset: 'article/';
} = {
  account: 'account/',
  accountLogin: 'auth/login',
  accountLogout: 'account/logout',
  dataset: 'article/',
}
