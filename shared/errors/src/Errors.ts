import HttpStatusCode from './HttpStatusCode'

export class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: HttpStatusCode
  public readonly isOperational: boolean

  constructor(name: string, description: string, httpCode: HttpStatusCode, isOperational: boolean) {
    super(description)

    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }

  toDTO() {
    return {
      name: this.name,
      message: this.message,
      code: this.httpCode
    }
  }
}

export namespace AppError {
  export class InvalidInput extends BaseError {
    public constructor(
      description: string,
      name = 'Invalid Input',
      httpCode = HttpStatusCode.BAD_REQUEST,
      isOperational = true
    ) {
      super(name, description, httpCode, isOperational)
    }
  }

  export class NotFound extends BaseError {
    public constructor(
      description: string,
      name = 'Not Found',
      httpCode = HttpStatusCode.NOT_FOUND,
      isOperational = true
    ) {
      super(name, description, httpCode, isOperational)
    }
  }

  export class UnprocessableEntity extends BaseError {
    public constructor(
      description: string,
      name = 'Unprocessable Entity',
      httpCode = HttpStatusCode.UNPROCESSABLE_ENTITY,
      isOperational = true
    ) {
      super(name, description, httpCode, isOperational)
    }
  }

  export class UnexpectedError extends BaseError {
    public constructor(
      description: string,
      name = 'Unexpected Error',
      httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
      isOperational = false
    ) {
      super(name, description, httpCode, isOperational)
    }
  }

  export class NotFoundError extends BaseError {
    public constructor(
      description: string,
      name = 'Data Not Found',
      httpCode = HttpStatusCode.NOT_FOUND,
      isOperational = true
    ) {
      super(name, description, httpCode, isOperational)
    }
  }
}

export namespace OperationalError {
}
