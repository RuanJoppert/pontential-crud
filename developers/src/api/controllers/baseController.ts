import { Request, Response, NextFunction } from 'express'
import { AppError, BaseError } from '../../utils'

export abstract class BaseController {
  protected req: Request
  protected res: Response
  protected next: NextFunction

  protected abstract executeImpl(): Promise<void | any>

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    this.req = req
    this.res = res
    this.next = next

    try {
      await this.executeImpl()
    } catch (err) {
      console.log('Uncaught controller error')
      this.fail('An unexpected error occurred')
    }
  }

  public list<T>(data: T, status = 200) {
    return this.res.status(status).json({
      type: 'list',
      data
    })
  }

  public ok<T>(dto?: T) {
    if (dto) {
      this.res.type('application/json')
      return this.res.status(200).json(dto)
    } else {
      return this.res.sendStatus(200)
    }
  }

  public created() {
    return this.res.sendStatus(201)
  }

  public deleted() {
    return this.res.sendStatus(204)
  }

  public error(error: BaseError | BaseError[], status?: number) {
    error = Array.isArray(error) ? error : [error]

    const errors = error.reduce((errors, error) => {
      if (error?.isOperational) {
        errors.push(error.toDTO())
      } else {
        errors.push(new AppError.UnexpectedError(error.message))
      }

      return errors
    }, [])

    return this.res.status(status || error[0].httpCode || 500).json({
      type: 'error',
      errors
    })
  }

  public fail(error: Error | string) {
    return this.res.status(500).json({
      message: error.toString()
    })
  }
}
