import { zeros } from './zeros'

describe('zeros', () => {
  describe('creates arrays with given length', () => {
    const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    cases.forEach(length => {
      test(`length = ${length}`, () => {
        const expected = new Array(length).fill(0)

        expect(zeros(length)).toStrictEqual(expected)
      })
    })
  })
})
