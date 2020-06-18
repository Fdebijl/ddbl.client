import { StorageService } from '../_services/storage.service'; // Don't import from the barrel file for services, that will be seen as a circular dependency by angular
import { ToastComponent } from '../_components/toast/toast.component';
import { Endpoint } from '../_domain/enum/Endpoint';
import { environment } from 'src/environments/environment';
import { SessionExpiredError } from '../_domain/class/SessionExpiredError';
import { NoNetworkError } from '../_domain/class/NoNetworkError';

import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

/** Internal implementation, do not use */
export const _extendDefault = (options?: RequestInit): RequestInit => {
  const defaults: RequestInit = {
    method: 'GET',
    credentials: 'omit',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (!options) {
    return defaults;
  } else {
    debugger;
    defaults.headers = Object.assign(defaults.headers, options.headers || {});
    delete options.headers;
    return Object.assign(defaults, options);
  }
}

export type AuthorizedFetchContextOptions = {
  authorized?: boolean;
  useDefaults?: boolean;
  surpressToast?: boolean
}

const DefaultContext: AuthorizedFetchContextOptions = {
  authorized: true,
  useDefaults: true,
  surpressToast: false,
}

/**
 * Make a call to an endpoint that requires authorization, using sensible defaults.
 * You can manually pass the endpoint as a string, but the recommended usage is to import the `Endpoints` object from `_domain/enum/Endpoint`.
 *
 * Alternativately, you may also omit the authorization header by passing an object with `authorized: false` as the third parameter.
 * To prevent AuthorizedFetch from directly showing toasts for any errors, simply pass `surpessToast = true` in the same object.
 *
 * @param endpoint {Endpoint} The endpoint to send this request to. Omit any leading slashes.
 * @param [options] {RequestInit} The same options object as used with the fetch API.
 * @param [authorized] = true Whether to include the token as the Authorization header.
 *
 * @throws SessionExpiredError Handle this error by saving any form data or pending action to localstorage and redirecting the user to the login page.
 * @throws NoNetworkError Thrown when no network connection exists
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
export const AuthorizedFetch = (endpoint: Endpoint, options?: RequestInit, contextOptions: AuthorizedFetchContextOptions = DefaultContext): Promise<Response> => {
  // Ensure all defaults are used when the user omits any.
  contextOptions = Object.assign(JSON.parse(JSON.stringify(DefaultContext)), contextOptions);

  const toastr: ToastrService = ToastComponent.getInstance();

  if (contextOptions.authorized) {
    const storageService = new StorageService();
    const token = storageService.user.getValue().token;
    const tokenExpiration = storageService.user.getValue().tokenExpiration;
    const tokenIsExpired = moment.utc(tokenExpiration).isBefore(moment.now(), 'milliseconds');

    if (tokenIsExpired) {
      storageService.user.clear();

      if (!contextOptions.surpressToast) {
        toastr.error('Your session has expired, please log in.', 'Error');
      }

      throw new SessionExpiredError({
        name: 'SessionExpiredError',
        message: 'Your session has expired, please log in.'
      });
    }

    // Check for internet connection
    if (!navigator.onLine) {
      if (!contextOptions.surpressToast) {
        toastr.warning('There is no network connection right now. Check your internet connection and try again.', 'Error');
      }

      throw new NoNetworkError({
        name: 'NoNetworkError',
        message: 'There is no network connection right now. Check your internet connection and try again.'
      });
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

  if (contextOptions.useDefaults) {
    options = _extendDefault(options);
  }

  return fetch(uri, options);
};

