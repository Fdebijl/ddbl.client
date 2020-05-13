type ArticleEndpoint =
  'article/foo'

type AccountEndpoint =
  'account' |
  'account/login'

export type Endpoint = AccountEndpoint | ArticleEndpoint | string;


export const Endpoints: {
  account: 'account';
  accountLogin: 'account/login';
} = {
  account: 'account',
  accountLogin: 'account/login'
}