import { Result } from 'potential-crud-result'
import { AppError } from 'potential-crud-errors'
import { ValueObject } from './valueObject'
import { nanoid } from 'nanoid'

interface UniqueEntityIDProps {
  id: string
}

export class UniqueEntityID extends ValueObject<UniqueEntityIDProps> {
  get value(): string {
    return this.props.id
  }

  private constructor(props: UniqueEntityIDProps) {
    super(props)
  }

  static create() {
    try {
      return Result.ok(new UniqueEntityID({ id: nanoid() }))
    } catch (error) {
      return Result.fail(new AppError.UnexpectedError('Unexpected Error on generate uuid'))
    }
  }
}
