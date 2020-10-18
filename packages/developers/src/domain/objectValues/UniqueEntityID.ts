import { Result } from '@potential-crud/result'
import { DomainError } from '@potential-crud/errors'
import { ValueObject } from './valueObject'
import { v4 as uuid } from 'uuid'

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
      return Result.ok(new UniqueEntityID({ id: uuid() }))
    } catch (error) {
      return Result.fail(new DomainError.UnexpectedError('Unexpected Error on generate uuid'))
    }
  }
}
