export class User {
  constructor(
    {id, email, displayName, password, token, tokenExpiration, bio, affiliation, profilePicture}:
    {id?: string; email?: string; displayName?: string; password?: string;
    token?: string; tokenExpiration?: Date; bio?: string; affiliation?: string; profilePicture?: string}) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.password = password;
    this.token = token;
    this.tokenExpiration = tokenExpiration;
    this.bio = bio;
    this.affiliation = affiliation;
    this.profilePicture = profilePicture;
  }

  public id: string;
  public email: string;
  public displayName: string;
  public password?: string;
  public token: string;
  public tokenExpiration: Date;
  public bio?: string;
  public affiliation?: string;
  public profilePicture?: string;
  public hasProfilePicture = true;

  public static mock(): User {
    return new User({
      id: '1',
      displayName: 'Floris de Bijl'
    });
  }

  public getAbbreviation(): string {
    if (!this.displayName) {
      return '?';
    }

    const words = this.displayName.split(' ');
    const first = words.shift();

    if (words.length === 0) {
      return first[0].toUpperCase();
    }

    const last = words.pop();

    return first[0].toUpperCase() + last[0].toUpperCase();
  }

  public getProfilePictureURL(): string {
    const url = 'https://vll.floris.amsterdam/static/avatars/' + this.id + '.jpeg';
    return url;
}

public noProfilePicture (): void {
    this.hasProfilePicture = false;
}

  public toObject(): Record<string, unknown> {
    const u = this as User;
    Object.keys(u).forEach(key => u[key] === undefined ? delete u[key] : {});
    // Workaround so we can return User as an object https://github.com/microsoft/TypeScript/issues/15300#issuecomment-436793742
    return {...u};
  }
}
