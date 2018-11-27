import { expect } from 'chai'
import { Polynomial } from '../src/polynomial'

describe('Polynomial', () => {
  describe('#calculate', () => {
    describe('[1, 1, 5]', () => {
      const polynomial = new Polynomial([1, 1, 5])
      const cases = [
        [1, 7],
        [10, 115],
        [100, 10105],
      ]

      cases.forEach(([x, y]) => {
        it(`x = ${x}`, () => {
          expect(polynomial.calculate(x)).to.equal(y)
        })
      })
    })
    describe('[2, 0, 4, 0, 2, 3]', () => {
      const polynomial = new Polynomial([2, 0, 4, 0, 2, 3])
      const cases = [
        [1, 11],
        [2, 103],
        [4, 2315],
      ]

      cases.forEach(([x, y]) => {
        it(`x = ${x}`, () => {
          expect(polynomial.calculate(x)).to.equal(y)
        })
      })
    })
  })
})
