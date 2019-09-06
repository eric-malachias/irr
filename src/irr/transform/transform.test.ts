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
        { amount: 0, date: '20170101' },
        { amount: 0, date: '2017-03-21' },
        { amount: 0, date: '2018/02/11' },
        { amount: 0, date: '20190629' },
        { amount: 0, date: '20190802' },
      ],
      output: [
        { amount: 0, day: 0 },
        { amount: 0, day: 79 },
        { amount: 0, day: 406 },
        { amount: 0, day: 909 },
        { amount: 0, day: 943 },
      ],
    },
    {
      name: 'dates',
      input: [
        { amount: 0, date: new Date(2010, 6, 12) },
        { amount: 0, date: new Date(2011, 3, 7) },
        { amount: 0, date: new Date(2011, 9, 1) },
        { amount: 0, date: new Date(2012, 11, 4) },
        { amount: 0, date: new Date(2012, 12, 23) },
      ],
      output: [
        { amount: 0, day: 0 },
        { amount: 0, day: 269 },
        { amount: 0, day: 446 },
        { amount: 0, day: 876 },
        { amount: 0, day: 926 },
      ],
    },
    {
      name: 'mixed',
      input: [
        { amount: 0, date: new Date(2002, 3, 13) },
        { amount: 0, date: '20030502' },
        { amount: 0, date: '20030917' },
        { amount: 0, date: new Date(2003, 11, 20) },
        { amount: 0, date: new Date(2003, 12, 12) },
      ],
      output: [
        { amount: 0, day: 0 },
        { amount: 0, day: 384 },
        { amount: 0, day: 522 },
        { amount: 0, day: 616 },
        { amount: 0, day: 639 },
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
