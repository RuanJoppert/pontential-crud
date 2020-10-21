import { Sexo } from './Sexo'

describe('Sexo Object Value', () => {
  it('should return an error when trying to create a Sexo with invalid input', () => {
    const nome = Sexo.create('X')

    expect(nome.fail).toBe(true)
    expect(nome.error).toBeInstanceOf(Error)
    expect(nome.error.message === 'Sexo must be M or F').toBeTruthy()
  })

  it('should create with valid input', () => {
    const nome = Sexo.create('F')

    expect(nome.fail).toBeFalsy()
    expect(nome.value.value).toBe('F')
  })
})
