type ArticleEndpoint =
  'article/foo'

type AccountEndpoint =
  'account' |
  'account/login' |
  'account/logout'

export type Endpoint = AccountEndpoint | ArticleEndpoint | string;


export const Endpoints: {
  account: 'account';
  accountLogin: 'account/login';
  accountLogout: 'account/logout';
} = {
  account: 'account',
  accountLogin: 'account/login',
  accountLogout: 'account/logout'
}