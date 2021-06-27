export class ValidationError {
  //TODO: Build ValidationError Class
  //TODO: Build SanityCheck[Error] Class
}

export class RequestValidationError extends Error {
  constructor(private errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
