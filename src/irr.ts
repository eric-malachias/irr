import { Polynomial } from './polynomial'
import { RootFinderOptions, DEFAULT_ROOT_FINDER_OPTIONS } from './root-finder/definition'

export function irr (
  coefficients: number[],
  options: RootFinderOptions = DEFAULT_ROOT_FINDER_OPTIONS,
): number {
  const polynomial = new Polynomial(coefficients)

  return polynomial.findRoot(options) - 1
}
