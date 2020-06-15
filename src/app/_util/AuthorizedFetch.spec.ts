import { extendDefault } from './AuthorizedFetch';

describe('AuthorizedFetch', () => {
  it('should produce options with defaults', () => {
    const expected: RequestInit = {
      method: 'POST',
      credentials: 'omit',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Payload': 'users'
      }
    };

    const actual = extendDefault({
      method: 'POST',
      headers: {
        'Payload': 'users'
      }
    });

    expect(actual).toEqual(expected);
  });
});
