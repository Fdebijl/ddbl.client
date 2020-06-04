type ArticleEndpoint =
  'article/foo'

type AccountEndpoint =
  '' |
  'login' |
  'logout'

export type Endpoint = AccountEndpoint | ArticleEndpoint | string;


export const Endpoints: {
  account: '';
  accountLogin: 'login';
  accountLogout: 'logout';
} = {
  account: '',
  accountLogin: 'login',
  accountLogout: 'logout'
}