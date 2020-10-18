import { Nome } from './Nome'

describe('Nome Object Value', () => {
  it('should return an error when trying to create a Nome with invalid input', () => {
    const nome = Nome.create('Ru')

    expect(nome.fail).toBe(true)
    expect(nome.error).toBeInstanceOf(Error)
    expect(nome.error.message === 'Nome must be greater than 2 chars and less than 100').toBeTruthy()
  })

  it('should create with valid input', () => {
    const nome = Nome.create('Ruan')

    expect(nome.fail).toBeFalsy()
    expect(nome.value.value).toBe('Ruan')
  })
})
