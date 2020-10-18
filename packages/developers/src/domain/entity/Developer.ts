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
      props.hobby
    )

    if (result.fail === true) {
      return Result.fail(result.error)
    }

    const [nome, sexo, datanascimento, hobby] = result.unwrap()

    if (!id) {
      const uuid = UniqueEntityID.create()

      if (uuid.fail === true) {
        return Result.fail([uuid.error])
      }

      id = uuid.value.value
    }

    const dev = new Developer(
      {
        nome: nome.value,
        sexo: sexo.value,
        datanascimento: datanascimento.value,
        hobby
      },
      id
    )

    return Result.ok(dev)
  }

  static from<T>(developer: T): T {
    if (developer instanceof Array) {
      return (developer.map((dev) => new Developer(dev, dev._id)) as unknown) as T
    }

    const dev = developer as any
    const id = dev._id

    return (new Developer(dev as any, id) as unknown) as T
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
