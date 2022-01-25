import { Polynomial } from '../../polynomial'
import {
  RootFinderOptions,
  getRootFinderOptionsWithDefaults,
} from '../../root-finder'

export function irr(
  values: number[],
  options: Partial<RootFinderOptions> = {},
): number {
  const polynomial = new Polynomial(values)
  const root = polynomial.findRoot(getRootFinderOptionsWithDefaults(options))

  if (!root.converged) {
    return NaN
  }

  return root.value - 1
}
