import { expect } from 'chai'
import sinon from 'sinon'
import { Polynomial } from '../../polynomial'
import { xirr } from '../..'
import { RootFinderOptions, RootFinderMethod } from '../../root-finder'

const UNIQUE_ROOT = {
  converged: true,
  iterations: 0,
  value: Math.PI,
}
const UNIQUE_XIRR_RESULT = {
  days: 60,
  rate: Math.PI - 1,
}
const UNIQUE_DATA = [
  { amount: -10, date: '20180101' },
  { amount: 10, date: '20180201' },
  { amount: 0.05, date: '20180301' },
]
const UNIQUE_OPTIONS: RootFinderOptions = {
  estimate: 'auto',
  epsilon: 1e-8,
  fallbackMethod: RootFinderMethod.Bisection,
  maxIterations: 100,
  method: RootFinderMethod.Newton,
}

describe('xirr', () => {
  it('uses Polynomial.prototype.findRoot() for the calculation', () => {
    const stub = sinon
      .stub(Polynomial.prototype, 'findRoot')
      .returns(UNIQUE_ROOT)

    const result = xirr(UNIQUE_DATA, UNIQUE_OPTIONS)

    expect(result).to.deep.equal(UNIQUE_XIRR_RESULT)
    // tslint:disable-next-line no-unused-expression
    expect(stub.calledOnce).to.be.true

    sinon.restore()
  })
  it('groups amounts from the same date', () => {
    const result = xirr(
      [
        { amount: -10, date: '20180101' },
        { amount: 5, date: '20180201' },
        { amount: 5, date: '20180201' },
        { amount: 0.05, date: '20180301' },
      ],
      UNIQUE_OPTIONS,
    )

    expect(result).to.deep.equal({ days: 60, rate: 0.0001601831164046441 })
  })
})
