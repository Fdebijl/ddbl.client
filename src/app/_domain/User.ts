export class User {
  constructor({id, username, displayname, profile_image_url, email, token}: {id?: string; username?: string; displayname?: string; profile_image_url?: string; email?: string; token?: string}) {
    this.id = id;
    this.username = username;
    this.displayname = displayname;
    this.profile_image_url = profile_image_url;
    this.email = email;
    this.token = token;
  }

  public id: string;
  public username: string;
  public password: string;
  public email: string;
  public displayname: string;
  public profile_image_url: string;
  public token: string;
}
