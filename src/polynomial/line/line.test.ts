import { expect } from 'chai'
import { Line } from './line'

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

        expect(line.findRoot().value).to.equal(root)
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
