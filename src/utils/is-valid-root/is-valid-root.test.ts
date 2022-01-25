import { isValidRoot } from './is-valid-root'

describe('isValidRoot', () => {
  const cases: [number, boolean][] = [
    [5, true],
    [0.01, true],
    [NaN, false],
    [Infinity, false],
    [-Infinity, false],
    [-0.01, false],
    [-5, false],
  ]

  cases.forEach(([input, expected]) => {
    test(`${input} -> ${expected}`, () => {
      expect(isValidRoot(input)).toBe(expected)
    })
  })
})
