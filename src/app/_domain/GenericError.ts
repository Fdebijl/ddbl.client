export class GenericError {
  public message: string | undefined;
  public status: string | undefined;
  public stack: string | undefined;

  constructor({message, status, stack}: {message?: string; status?: string; stack?: string}) {
    this.message = message;
    this.status = status;
    this.stack = stack;
  }
}