interface IErrorResponse {
  status: number;
  message: string;
  detail?: string;
}

export const Errors = {
  BadRequest: {
    status: 400,
    message: 'Request has wrong format.',
  },
  Unauthorized: {
    status: 401,
    message: 'Authentication credentials not valid.',
  },
  Forbidden: {
    status: 403,
    message: "You're missing permission to execute this request.",
  },
  NotFound: {
    status: 404,
    message: "The resource you're looking for does not exist.",
  },
  InternalServerError: {
    status: 500,
    message: 'Something went wrong at our end.',
  },
};

export interface IRestError {
  response: IErrorResponse;
}

export class RestError extends Error implements IRestError {
  public response: IErrorResponse;

  constructor(
    error: { status: number; message: string },
    detail: string = undefined,
    ...args: any
  ) {
    super(...args);
    this.response = {
      status: error.status,
      message: error.message,
      detail: detail,
    };
    Object.setPrototypeOf(this, RestError.prototype);
    this.name = 'RestError';
  }
}
