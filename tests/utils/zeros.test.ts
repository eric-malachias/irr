import { expect } from 'chai'
import { zeros } from '../../src/utils/zeros'

describe('zeros', () => {
  it('creates arrays with given length', () => {
    const cases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    cases.forEach(length => {
      const expected = new Array(length).fill(0)

      expect(zeros(length)).to.deep.equal(expected)
    })
  })
})
