import { BehaviorSubject } from 'rxjs';

/**
 * BehaviorSubject is a special observable provided by rxjs that allows external classes to get the current value
 * by calling .getValue(), that way they don't have to wait for the next change by subscribing.
 * This class extends that observable by providing methods for persisting the subject via localstorage.
 *
 * @param {string} key The key that the value for this subject will be saved under in Local Storage
 * @param {T} [_value] The value this Subject should assume when initialized
 * @param {(subject: T) => T} [modifier] A function that can be used to shape the data retrieved from Local Storage. Use the modifier to instantiate the stored JSON as a class with all its methods.
 *
 * @example
 * // Initiate a new StoredBehaviourSubject with a User, but make sure the value is actually a user.
 * // If we don't use the modifier to return new User(), the subject's value won't have any of the methods of the User class.
 * public user: StoredBehaviorSubject<User> = new StoredBehaviorSubject<User>('user', null, (user) => {
 *  return new User(user);
 * });
 *
 * @author Floris de Bijl <@fdebijl>
 */
export class StoredBehaviorSubject<T> extends BehaviorSubject<T> {
  private key: string;

  constructor(key: string, _value?: T, modifier?: (subject: T) => T) {
    if (!_value) {
      _value = JSON.parse(localStorage.getItem(key)) as T;
    }

    if (modifier && _value) {
      _value = modifier(_value);
    }

    super(_value);
    this.key = key;

    this.subscribe({
      next: (value) => {
        if (value) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      }
    })
  }

  isSet(): boolean {
    return !!localStorage.getItem(this.key);
  };

  clear(): void {
    this.next(null);
    localStorage.removeItem(this.key);
  }
}