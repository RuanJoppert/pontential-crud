import { Result } from '@potential-crud/result'
import { DomainError } from '@potential-crud/errors'
import { ValueObject } from './valueObject'

type SexoType = 'M' | 'F'

interface SexoProps {
  sexo: SexoType
}

export class Sexo extends ValueObject<SexoProps> {
  get value(): SexoType {
    return this.props.sexo
  }

  private constructor(props: SexoProps) {
    super(props)
  }

  static isValid(sexo: SexoType) {
    if (sexo !== 'M' && sexo !== 'F') {
      return false
    }

    return true
  }

  static create(sexo: SexoType) {
    if (!this.isValid(sexo)) {
      return Result.fail(new DomainError.InvalidInput('Sexo must be M or F'))
    }

    return Result.ok(new Sexo({ sexo }))
  }
}
