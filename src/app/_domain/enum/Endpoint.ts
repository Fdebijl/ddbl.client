type ArticleEndpoint =
  'article/foo'

type AccountEndpoint =
  'account/' |
  'auth/login' |
  'account/logout'

export type Endpoint = AccountEndpoint | ArticleEndpoint | string;


export const Endpoints: {
  account: 'account/';
  accountLogin: 'auth/login';
  accountLogout: 'account/logout';
} = {
  account: 'account/',
  accountLogin: 'auth/login',
  accountLogout: 'account/logout',
}
