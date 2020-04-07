export class User {
  constructor(
    {id, email, displayname, password, token, tokenExpiration, bio, affiliation}:
    {id?: string; email?: string; displayname?: string; password?: string; token?: string; tokenExpiration?: Date; bio?: string; affiliation?: string}) {
    this.id = id;
    this.email = email;
    this.displayname = displayname;
    this.password = password;
    this.token = token;
    this.tokenExpiration = tokenExpiration;
    this.bio = bio;
    this.affiliation = affiliation;
  }

  public id: string
  public email: string
  public displayname: string
  public password?: string
  public token: string
  public tokenExpiration: Date
  public bio?: string
  public affiliation?: string
}
