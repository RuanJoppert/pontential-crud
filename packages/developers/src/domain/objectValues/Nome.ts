import { Result } from '@potential-crud/result'
import { DomainError } from '@potential-crud/errors'
import { ValueObject } from './valueObject'

interface NomeProps {
  nome: string
}

export class Nome extends ValueObject<NomeProps> {
  get value(): string {
    return this.props.nome
  }

  private constructor(props: NomeProps) {
    super(props)
  }

  static isValid(nome: string) {
    if (!nome || nome.length <= 3 || nome.length > 100) {
      return false
    }

    return true
  }

  static create(nome: string) {
    if (this.isValid(nome) === false) {
      return Result.fail(new DomainError.InvalidInput('Nome must be greater than 2 chars and less than 100'))
    }

    return Result.ok(new Nome({ nome }))
  }
}
