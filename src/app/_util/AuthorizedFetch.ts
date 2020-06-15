import { StorageService } from '../_services/storage.service'; // Don't import from the barrel file for services, that will be seen as a circular dependency by angular
import { Endpoint } from '../_domain/enum/Endpoint';
import { environment } from 'src/environments/environment';
import { SessionExpiredError } from '../_domain/class/SessionExpiredError';

import moment from 'moment';

export const extendDefault = (options?: RequestInit): RequestInit => {
  const defaults: RequestInit = {
    method: 'GET',
    credentials: 'omit',
    cache: 'no-cache',
    headers: Object.assign({
      'Content-Type': 'application/json'
    }, options.headers),
  }

  delete options.headers;

  return Object.assign(defaults, options);
}

/**
 * Make a call to an endpoint that requires authorization, using sensible defaults.
 * You can manually pass the endpoint as a string, but the recommended usage is to import the `Endpoints` object from `_domain/enum/Endpoint`.
 * Alternativately, you may also omit the authorization header by passing `false` as the third parameter.
 *
 * @param endpoint {Endpoint} The endpoint to send this request to. Omit any leading slashes.
 * @param [options] {RequestInit} The same options object as used with the fetch API.
 * @param [authorized] = true Whether to include the token as the Authorization header.
 *
 * @throws SessionExpiredError Handle this error by saving any form data or pending action to localstorage and redirecting the user to the login page.
 *
 * @author Floris de Bijl <fdebijl>
 *
 * @example
 * import { Endpoints } from '../_domain/enum/Endpoint';
 *
 * AuthorizedFetch(Endpoints.accountUpdate + user.id, {
 *    method: 'UPDATE',
 *    body: JSON.stringify(user)
 * }).then((res) => res.json())
 * .then((data) => {
 *    console.log(data);
 * })
 */
export const AuthorizedFetch = (endpoint: Endpoint, options?: RequestInit, authorized = true, useDefaults = true): Promise<Response> => {
  if (authorized) {
    const storageService = new StorageService();
    const token = storageService.user.getValue().token;
    const tokenExpiration = storageService.user.getValue().tokenExpiration;
    const tokenIsExpired = moment.utc(tokenExpiration).isBefore(moment.now(), 'milliseconds');

    if (tokenIsExpired) {
      console.log('Clearing session');
      storageService.user.clear();
      throw new SessionExpiredError({
        name: 'SessionExpiredError',
        message: 'Your session has expired, please log in.'
      })
    }

    if (!options) {
      options = {
        headers: {}
      };
    }

    if (!options.headers) {
      options.headers = {};
    }

    options.headers['Authorization'] = token;
  }

  const uri = `${environment.api_url}/${endpoint}`;
  if (useDefaults) {
    options = extendDefault(options);
  }

  return fetch(uri, options);
};

