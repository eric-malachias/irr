import { RootFinderOptions, IRootFinder } from './definition'
import { Polynomial } from '../polynomial/polynomial'
import { isValidRoot } from '../utils/is-valid-root'

export class NewtonRootFinder implements IRootFinder {
  constructor (
    protected readonly options: RootFinderOptions,
  ) {}

  protected autoEstimate (polynomial: Polynomial): number {
    const coefficients = polynomial.getCoefficients()
    const { length } = coefficients

    let positive: number = 0
    let negative: number = 0

    coefficients.forEach(coefficient => {
      if (coefficient > 0) {
        positive += coefficient
      } else {
        negative -= coefficient
      }
    })

    return ((positive / negative) - 1) / length + 1
  }

  public findRoot (polynomial: Polynomial): number {
    const epsilon = this.options.epsilon!
    const { estimate } = this.options
    const maxIterations = this.options.maxIterations!

    let iteration: number = 0
    let root: number = estimate === 'auto'
      ? this.autoEstimate(polynomial)
      : estimate!

    while (iteration++ < maxIterations) {
      const calculated = polynomial.calculate(root)

      if (Math.abs(calculated) < epsilon) {
        break
      }

      const tangent = polynomial.getTangentAt(root)

      root = tangent.findRoot()

      if (!isValidRoot(root)) {
        break
      }
    }

    return root
  }
}
