import { expect } from 'chai'
import { Polynomial } from './polynomial'

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
        it(`x = ${x}, f(x) = ${y}`, () => {
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
        it(`x = ${x}, f(x) = ${y}`, () => {
          expect(polynomial.calculate(x)).to.equal(y)
        })
      })
    })
  })
  describe('#differenciate', () => {
    const cases = [
      [
        [1, 2],
        [1],
      ],
      [
        [3, 4, 5],
        [6, 4],
      ],
      [
        [6, 7, 8, 9],
        [18, 14, 8],
      ],
    ]

    cases.forEach(([coefficients, derivativeCoefficients]) => {
      it(`[${coefficients.join(', ')}] -> [${derivativeCoefficients.join(', ')}]`, () => {
        const polynomial = new Polynomial(coefficients)
        const derivative = polynomial.differentiate()

        expect(derivative.getCoefficients()).to.deep.equal(derivativeCoefficients)
      })
    })
  })
  describe('#getCoefficients', () => {
    const cases = [
      [1],
      [2, 3],
      [4, 5, 6],
    ]

    it('returns correct coefficients', () => {
      cases.forEach(coefficients => {
        const polynomial = new Polynomial(coefficients)

        expect(polynomial.getCoefficients()).to.deep.equal(coefficients)
      })
    })
  })
  describe('#getTangentAt', () => {
    const cases: [number[], number, number[]][] = [
      [
        [-1, 0, 1],
        0,
        [0, 1],
      ],
      [
        [3, 2, 1],
        1,
        [8, -2],
      ],
      [
        [4, -3, -2, 1, 4, 7],
        -1,
        [28, 27],
      ],
    ]

    cases.forEach(([coefficients, x, [m, k]]) => {
      it(`[${coefficients.join(', ')}](${x}) -> [${m}, ${k}]`, () => {
        const polynomial = new Polynomial(coefficients)
        const tangent = polynomial.getTangentAt(x)

        expect(tangent.getM()).to.equal(m)
        expect(tangent.getK()).to.equal(k)
      })
    })
  })
})
