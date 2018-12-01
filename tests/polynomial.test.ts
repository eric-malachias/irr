import { expect } from 'chai'
import { Polynomial, Line } from '../src/polynomial'

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
describe('Line', () => {
  describe('#calculate', () => {
    const cases: [number, number, number][] = [
      [1, 1, 5],
      [2, 7, 3],
      [9, -1, -1],
      [9, 2, -2],
      [7, -3, -4],
    ]

    cases.forEach(([m, k, x]) => {
      const value = m * x + k

      it(`[${m}, ${k}](${x}) -> ${value}`, () => {
        const line = new Line(m, k)

        expect(line.calculate(x)).to.equal(value)
      })
    })
  })
  describe('#findRoot', () => {
    const cases: [number, number][] = [
      [1, 1],
      [2, 7],
      [9, -1],
      [9, 2],
      [7, -3],
    ]

    cases.forEach(([m, k]) => {
      const root = -k / m

      it(`[${m}, ${k}] -> ${root}`, () => {
        const line = new Line(m, k)

        expect(line.findRoot()).to.equal(root)
      })
    })
  })
  describe('#getK', () => {
    const cases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    it('reads k correctly', () => {
      cases.forEach(k => {
        const line = new Line(-1, k)

        expect(line.getK()).to.equal(k)
      })
    })
  })
  describe('#getM', () => {
    const cases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    it('reads m correctly', () => {
      cases.forEach(m => {
        const line = new Line(m, -1)

        expect(line.getM()).to.equal(m)
      })
    })
  })
})
