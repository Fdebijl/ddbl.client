type ArticleEndpoint =
  'article/foo'

type AccountEndpoint =
  'account/foo' |
  'account/bar'

export type Endpoint = AccountEndpoint | ArticleEndpoint;


export const Endpoints: {
  [key: string]: Endpoint;
} = {

}