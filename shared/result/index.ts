/**
 * Contains the error value
 */
export class Fail<E> {
  readonly fail = true
  readonly error!: E
  readonly ok = false

  constructor(val: E) {
    if (!(this instanceof Fail)) return new Fail(val)

    this.fail = true
    this.error = val
    this.ok = false

    Object.freeze(this)
  }
}

/**
 * Contains the success value
 */
export class Ok<T> {
  readonly fail = false
  readonly value!: T
  readonly ok = true

  constructor(val: T) {
    if (!(this instanceof Ok)) return new Ok(val)

    this.fail = false
    this.value = val
    this.ok = true
  }

  or(_val: unknown): T {
    return this.value
  }

  unwrap(): T {
    return this.value
  }
}

type Either<T, E> = Ok<T> | Fail<E>

type ResultOkType<T extends Either<any, any>> = T extends Either<infer U, any> ? U : never
type ResultFailType<T extends Either<any, any>> = T extends Either<any, infer U> ? U : never

type ResultOks<T extends Either<any, any>[]> = {
  [key in keyof T]: T[key] extends Either<any, any> ? (T[key] extends Either<infer U, any> ? U : never) : T[key]
}

type ResFails<T extends Either<any, any>[]> = {
  [key in keyof T]: T[key] extends Either<any, infer U> ? U : never
}

export class Result {
  static from<T extends any[]>(...results: T) {
    const okResults: T[] = []
    const errResults: ResFails<T>[] = []

    for (const result of results) {
      if (result?.fail === true) {
        errResults.push(result.error)
      }

      okResults.push(result?.value || result)
    }

    if (errResults.length) {
      return new Fail(errResults as ResFails<T>)
    }

    return new Ok(okResults as ResultOks<T>)
  }

  static all<T extends Either<any, any>[]>(...results: T): Either<ResultOks<T>, ResFails<T>[number]> {
    const okResult = []

    for (const result of results) {
      if (result.ok) okResult.push(result.value)

      if (result.fail) {
        return result as Fail<ResFails<T>[number]>
      }
    }

    return new Ok(okResult as ResultOks<T>)
  }

  public static any<T extends Either<any, any>[]>(...results: T): Either<ResultOks<T>[number], ResFails<T>> {
    const errResult = []

    for (const result of results) {
      if (result.fail) errResult.push(result.error)

      if (result.ok) {
        return result as Ok<ResultOks<T>[number]>
      }
    }

    return new Fail(errResult as ResFails<T>)
  }

  public static fail<E>(error: E): Fail<E> {
    return new Fail(error)
  }

  public static ok<T>(value: T): Ok<T> {
    return new Ok(value)
  }
}
