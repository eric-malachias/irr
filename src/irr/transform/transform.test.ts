import { expect } from 'chai'
import { transform } from './transform'
import { XirrInput, InternalXirrInput } from '../definition'

describe('transform', () => {
  const cases: {
    name: string,
    input: XirrInput[],
    output: InternalXirrInput[],
  }[] = [
    {
      name: 'empty input',
      input: [],
      output: [],
    },
    {
      name: 'strings',
      input: [
        { amount: 0, date: '20190101' },
        { amount: 0, date: '20190201' },
      ],
      output: [
        { amount: 0, day: 0 },
        { amount: 0, day: 31 },
      ],
    },
  ]

  cases.forEach(({ name, input, output }) => {
    it(name, () => {
      const result = transform(input)

      expect(result).to.deep.equal(output)
    })
  })
})
