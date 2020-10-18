import { shallowEqual } from 'shallow-equal-object'

interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  readonly props: T

  constructor(props: T) {
    this.props = Object.freeze(props)
  }

  equals(valueObject?: ValueObject<T>): boolean {
    if (valueObject === undefined || valueObject === null || valueObject.props === undefined) {
      return false
    }

    return shallowEqual(this.props, valueObject.props)
  }
}
