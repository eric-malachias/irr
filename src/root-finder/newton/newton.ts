import { RootFinderOptions, IRootFinder, Root } from '../definition'
import { Polynomial } from '../../polynomial'
import { isValidRoot } from '../../utils'

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

  public findRoot (polynomial: Polynomial): Root {
    const epsilon = this.options.epsilon!
    const { estimate } = this.options
    const maxIterations = this.options.maxIterations!

    let iteration: number = 0
    let root: number = estimate === 'auto'
      ? this.autoEstimate(polynomial)
      : estimate!

    while (iteration++ < maxIterations) {
      const tangent = polynomial.getTangentAt(root)
      const newRoot = tangent.findRoot().value
      const delta = Math.abs(newRoot - root)

      root = newRoot

      if (delta < epsilon) {
        return {
          converged: true,
          iterations: iteration,
          value: root,
        }
      }

      if (!isValidRoot(root)) {
        return {
          converged: false,
          iterations: iteration,
          value: root,
        }
      }
    }

    return {
      converged: false,
      iterations: iteration - 1,
      value: root,
    }
  }
}
