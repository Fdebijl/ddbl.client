type DatasetEndpoint =
  'dataset/'

type AccountEndpoint =
  'account/' |
  'auth/login' |
  'account/logout'

export type Endpoint = AccountEndpoint | DatasetEndpoint | string;


export const Endpoints: {
  account: 'account/';
  accountLogin: 'auth/login';
  accountLogout: 'account/logout';
  dataset: 'dataset/';
} = {
  account: 'account/',
  accountLogin: 'auth/login',
  accountLogout: 'account/logout',
  dataset: 'dataset/',
}
