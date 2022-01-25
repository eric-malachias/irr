import { Polynomial } from '../../polynomial'
import { irr } from './irr'
import { RootFinderOptions, RootFinderMethod } from '../../root-finder'

const UNIQUE_ROOT = {
  converged: true,
  iterations: 0,
  value: Math.PI,
}
const UNIQUE_COEFFICIENTS = [2, 7, 0, 9]
const UNIQUE_OPTIONS: RootFinderOptions = {
  estimate: 'auto',
  epsilon: 1e-8,
  fallbackMethod: RootFinderMethod.Bisection,
  maxIterations: 100,
  method: RootFinderMethod.Newton,
}

describe('irr', () => {
  test('uses Polynomial.prototype.findRoot() for the calculation', () => {
    const stub = jest.spyOn(Polynomial.prototype, 'findRoot').mockReturnValue(UNIQUE_ROOT)

    const result = irr(UNIQUE_COEFFICIENTS, UNIQUE_OPTIONS)

    expect(result).toBe(UNIQUE_ROOT.value - 1)
    expect(stub).toHaveBeenCalledTimes(1)
  })
})
