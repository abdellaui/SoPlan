export class ErrorRequest {
  public error: any;
  public input: any;
  public hasError = true;
  constructor(error: any, input?: any) {
    console.log(error, input);
    this.error = error;
    this.input = input;
  }

  public static create(error: any, input?: any) {
    return new ErrorRequest(error, input);
  }

  public static hasError(instance: any): boolean {
    return (instance && instance.hasOwnProperty('hasError'));
  }
}
