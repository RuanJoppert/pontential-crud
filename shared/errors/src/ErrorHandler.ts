import { BaseError } from '.'

export class ErrorHandler {
  public logger: any

  constructor (logger: any) {
    this.logger = logger
  }

  public async handleError(err: Error): Promise<void> {
    await this.logger.error('Error from handler', err)
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational
    }

    return false
  }
}
