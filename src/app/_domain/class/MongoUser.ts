/**
 * Use User instead
 * @deprecated
 */
export class MongoUser {
  constructor() {
    console.error('Deprecation warning: Do not use MongoUser! Use "_domain/class/User" instead.');
    alert('Deprecation warning: Do not use MongoUser! Use "_domain/class/User" instead.')
  }

  public id: string;
  public email: string;
  public organization: string;
  public name: string;
  public description: string;
  public avatar: string;
}
