import { Developer } from './Developer'

let devParams

describe('Developers Entity', () => {
  beforeEach(() => {
    devParams = {
      nome: 'Jhon',
      sexo: 'M',
      hobby: 'Cinema',
      datanascimento: '1992/04/10'
    }
  })

  describe('Creation parameters', () => {
    it('should fail passing a invalid nome', () => {
      devParams.nome = ''

      const dev: any = Developer.create(devParams)
      const errorMessage = 'Nome must be greater than 2 chars and less than 100'

      expect(dev.fail).toBeTruthy()
      expect(dev.error.reduce((prev, err) => err.message === errorMessage || prev, false)).toBeTruthy()
    })

    it('should fail passing a invalid datanascimento', () => {
      devParams.datanascimento = '2000-01-25'

      const dev: any = Developer.create(devParams)
      const errorMessage = 'Data must be in ISO8601 format, eg: 2020/01/31'

      expect(dev.fail).toBeTruthy()
      expect(dev.error.reduce((prev, err) => err.message === errorMessage || prev, false)).toBeTruthy()
    })

    it('should fail passing a invalid sexo', () => {
      devParams.sexo = 'Male'

      const dev: any = Developer.create(devParams)
      const errorMessage = 'Sexo must be M or F'

      expect(dev.fail).toBeTruthy()
      expect(dev.error.reduce((prev, err) => err.message === errorMessage || prev, false)).toBeTruthy()
    })

    it('should create a new developer with valid parameters', () => {
      const dev: any = Developer.create(devParams)
      const check = Object.assign({}, devParams)

      delete check.datanascimento

      expect(dev.fail).toBeFalsy()
      expect(dev.ok).toBeTruthy()
      expect(dev.value).toMatchObject(check)
    })
  })

  describe('Ids', () => {
    it('should create a developer generating a unique id', () => {
      const dev: any = Developer.create(devParams)
      const check = Object.assign({}, devParams)

      delete check.datanascimento

      expect(dev.fail).toBeFalsy()
      expect(dev.ok).toBeTruthy()
      expect(dev.value).toMatchObject(check)
      expect(dev.value.id).toBeDefined()
    })

    it('should create a developer passing a id', () => {
      const dev: any = Developer.create(devParams, '1')
      const check = Object.assign({}, devParams)

      delete check.datanascimento

      expect(dev.fail).toBeFalsy()
      expect(dev.ok).toBeTruthy()
      expect(dev.value).toMatchObject(check)
      expect(dev.value.id).toEqual('1')
    })
  })

  describe('Date', () => {
    it('should return a correct date', () => {
      const dev: any = Developer.create(devParams)

      expect(dev.ok).toBeTruthy()
      expect(dev.value.datanascimento).toEqual(new Date('1992/04/10'))
      expect(dev.value.datanascimento).toEqual(new Date('1992/4/10'))
      expect(dev.value.datanascimento).toEqual(new Date('1992-4-10'))
    })

    it('should return a invalid date', () => {
      devParams.datanascimento = '25/01/2000'

      const dev: any = Developer.create(devParams)
      const errorMessage = 'Data must be in ISO8601 format, eg: 2020/01/31'

      expect(dev.ok).toBeFalsy()
      expect(dev.fail).toBeTruthy()
      expect(dev.error.reduce((prev, err) => err.message === errorMessage || prev, false)).toBeTruthy()
    })

    it('should return a correct age', () => {
      const dev: any = Developer.create(devParams)

      expect(dev.ok).toBeTruthy()
      expect(dev.fail).toBeFalsy()
      expect(dev.value.idade).toBe(28)
    })
  })
})
