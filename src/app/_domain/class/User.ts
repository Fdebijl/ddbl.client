export class User {
  constructor(
    {id, email, displayname, password, token, tokenExpiration, bio, affiliation, profilePicture}:
    {id?: string; email?: string; displayname?: string; password?: string; token?: string; tokenExpiration?: Date; bio?: string; affiliation?: string; profilePicture?: string}) {
    this.id = id;
    this.email = email;
    this.displayname = displayname || 'Floris de Bijl';
    this.password = password;
    this.token = token;
    this.tokenExpiration = tokenExpiration;
    this.bio = bio;
    this.affiliation = affiliation;
    this.profilePicture = profilePicture;
  }

  public id: string
  public email: string
  public displayname: string
  public password?: string
  public token: string
  public tokenExpiration: Date
  public bio?: string
  public affiliation?: string
  public profilePicture?: string;

  public getAbbreviation(): string {
    if (!this.displayname) {
      return '?';
    }

    const words = this.displayname.split(' ');
    const first = words.shift();

    if (words.length === 0) {
      return first[0].toUpperCase();
    }

    const last = words.pop();

    return first[0].toUpperCase() + last[0].toUpperCase();
  }
}
