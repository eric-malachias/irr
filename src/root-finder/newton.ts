import { RootFinderOptions, IRootFinder } from './definition'
import { Polynomial } from '../polynomial'

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
    let solution: number = estimate === 'auto'
      ? this.autoEstimate(polynomial)
      : estimate!

    while (iteration++ < maxIterations) {
      const calculated = polynomial.calculate(solution)

      if (Math.abs(calculated) < epsilon) {
        break
      }

      const tangent = polynomial.getTangentAt(solution)

      solution = tangent.findRoot()

      if (isNaN(solution) || !isFinite(solution)) {
        break
      }
    }

    return solution
  }
}
