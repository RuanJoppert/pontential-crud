import { Result } from '../../utils'
import { AppError } from '../../utils'
import { ValueObject } from './valueObject'

interface DataNascimentoProps {
  data: Date
}

export class DataNascimento extends ValueObject<DataNascimentoProps> {
  get value(): Date {
    return this.props.data
  }

  private constructor(props: DataNascimentoProps) {
    super(props)
  }

  static isValid(data: string) {
    if (data.length !== 10) {
      return false
    }

    return /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/g.test(data)
  }

  static create(data: string | Date) {
    if (data instanceof Date) {
      return Result.ok(new DataNascimento({ data }))
    }

    if (!this.isValid(data)) {
      return Result.fail(new AppError.InvalidInput('Data must be in ISO8601 format, eg: 2020/01/31'))
    }

    return Result.ok(new DataNascimento({ data: new Date(data) }))
  }
}
