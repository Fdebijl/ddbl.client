import { extendDefault } from './AuthorizedFetch';
import { deepStrictEqual } from 'assert';

fdescribe('AuthorizedFetch', () => {
  it('should produce options with defaults', () => {
    const expected = {
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

    deepStrictEqual(actual, expected);
  });
});
