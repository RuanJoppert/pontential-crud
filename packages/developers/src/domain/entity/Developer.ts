import { Result } from '@potential-crud/result'
import { DataNascimento, Nome, Sexo, UniqueEntityID } from '../objectValues'

export interface DeveloperProps {
  nome: string
  sexo: 'M' | 'F'
  hobby?: string
  datanascimento: Date | string
}

export class Developer {
  private readonly _id: string

  public nome: string
  public sexo: 'M' | 'F'
  public hobby?: string
  public datanascimento: Date

  get id() {
    return this._id
  }

  get idade() {
    const today = new Date()
    const birth = this.datanascimento
    const monthDifference = today.getMonth() - birth.getMonth()

    let age = today.getFullYear() - birth.getFullYear()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  private constructor(
    props: {
      nome: string
      sexo: 'M' | 'F'
      hobby?: string
      datanascimento: Date
    },
    id: string
  ) {
    this._id = id

    this.nome = props.nome
    this.sexo = props.sexo
    this.hobby = props.hobby
    this.datanascimento = props.datanascimento
  }

  static create(props: DeveloperProps, id?: string) {
    const result = Result.from(
      Nome.create(props.nome),
      Sexo.create(props.sexo),
      DataNascimento.create(props.datanascimento),
      props.hobby,
      id || UniqueEntityID.create()
    )

    if (result.fail === true) {
      return Result.fail(result.error)
    }

    const [nome, sexo, datanascimento, hobby, uuid] = result.unwrap()

    const dev = new Developer(
      {
        nome: nome.value,
        sexo: sexo.value,
        datanascimento: datanascimento.value,
        hobby
      },
      typeof uuid === 'string' ? uuid : uuid.ok ? uuid.value.value : ''
    )

    return Result.ok(dev)
  }

  static from(developer: Developer) {
    return new Developer(developer, developer._id)
  }

  update(props: Partial<DeveloperProps>) {
    const result = Result.from(
      Nome.create(props.nome || this.nome),
      Sexo.create(props.sexo || this.sexo),
      DataNascimento.create(props.datanascimento || this.datanascimento),
      props.hobby
    )

    if (result.fail === true) {
      return Result.fail(result.error)
    }

    Object.assign(this, props)

    return Result.ok(this)
  }
}
