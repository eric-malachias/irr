import { expect } from 'chai'
import { convertRate, RateFrequency } from '../../src'

const TEST_CASES = [{
  input: 0.002,
  output: 0.014084280560672235,
  from: RateFrequency.Daily,
  to: RateFrequency.Weekly,
}, {
  input: 0.0015,
  output: 0.045992592326769666,
  from: RateFrequency.Daily,
  to: RateFrequency.Monthly,
}, {
  input: 0.001,
  output: 0.44025131342950696,
  from: RateFrequency.Daily,
  to: RateFrequency.Yearly,
}, {
  input: 0.02,
  output: 0.0028329520024581445,
  from: RateFrequency.Weekly,
  to: RateFrequency.Daily,
}, {
  input: 0.03,
  output: 0.1350544019693063,
  from: RateFrequency.Weekly,
  to: RateFrequency.Monthly,
}, {
  input: 0.005,
  output: 0.2970139547183892,
  from: RateFrequency.Weekly,
  to: RateFrequency.Yearly,
}, {
  input: 0.013,
  output: 0.00043063353822936357,
  from: RateFrequency.Monthly,
  to: RateFrequency.Daily,
}, {
  input: 0.017,
  output: 0.003941072999491313,
  from: RateFrequency.Monthly,
  to: RateFrequency.Weekly,
}, {
  input: 0.023,
  output: 0.3187228866291123,
  from: RateFrequency.Monthly,
  to: RateFrequency.Yearly,
}, {
  input: 0.06,
  output: 0.00015965358745284597,
  from: RateFrequency.Yearly,
  to: RateFrequency.Daily,
}, {
  input: 0.07,
  output: 0.001298405320672158,
  from: RateFrequency.Yearly,
  to: RateFrequency.Weekly,
}, {
  input: 0.08,
  output: 0.006345613662022576,
  from: RateFrequency.Yearly,
  to: RateFrequency.Monthly,
}, {
  input: 0.045,
  output: 0.033316406476085136,
  from: 184,
  to: 137,
}, {
  input: 0.028,
  output: 0.053192180852872806,
  from: 73,
  to: 137,
}]

describe('convertRate', () => {
  TEST_CASES.forEach(testCase => {
    it(`${testCase.from} -> ${testCase.to}`, () => {
      const result = convertRate(testCase.input, testCase.to, testCase.from)

      expect(result).to.equal(testCase.output)
    })
  })
})
