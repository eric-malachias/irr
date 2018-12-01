import { expect } from 'chai'
import sinon from 'sinon'
import { Polynomial } from '../../src/polynomial/polynomial'
import { irr } from '../../src'
import { RootFinderOptions, RootFinderMethod } from '../../src/root-finder/definition'

const UNIQUE_IRR_RESULT = {
  converged: true,
  iterations: 0,
  value: Math.PI,
}
const UNIQUE_COEFFICIENTS = [2, 7, 0, 9]
const UNIQUE_OPTIONS: RootFinderOptions = {
  estimate: 'auto',
  epsilon: 1e-5,
  fallbackMethod: RootFinderMethod.Bisection,
  maxIterations: 10,
  method: RootFinderMethod.Newton,
}

describe('irr', () => {
  it('uses Polynomial.prototype.findRoot() for the calculation', () => {
    const stub = sinon
      .stub(Polynomial.prototype, 'findRoot')
      .returns(UNIQUE_IRR_RESULT)

    const result = irr(UNIQUE_COEFFICIENTS, UNIQUE_OPTIONS)

    expect(result).to.equal(UNIQUE_IRR_RESULT.value - 1)
    // tslint:disable-next-line no-unused-expression
    expect(stub.calledOnce).to.be.true

    sinon.restore()
  })
})
