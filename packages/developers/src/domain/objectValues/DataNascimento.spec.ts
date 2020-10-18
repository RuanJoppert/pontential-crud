import { DataNascimento } from './DataNascimento'

describe('DataNascimento Object Value', () => {
  it('should return an error when trying to create a Data with invalid input', () => {
    const data = DataNascimento.create('2020-10-17')

    expect(data.fail).toBe(true)
    expect(data.error).toBeInstanceOf(Error)
    expect(data.error.message === 'Data must be in ISO8601 format, eg: 2020/01/31').toBeTruthy()
  })

  it('should create with Date input', () => {
    const data = DataNascimento.create(new Date())

    expect(data.fail).toBeFalsy()
    expect(data.value.value).toBeInstanceOf(Date)
  })

  it('should create with string input', () => {
    const data = DataNascimento.create('2020/10/17')

    expect(data.fail).toBeFalsy()
    expect(data.value.value).toBeInstanceOf(Date)
  })
})
