import { RootFinderOptions, IRootFinder, Root } from '../definition'
import { Polynomial } from '../../polynomial'
import { isValidRoot } from '../../utils'

export class BisectionRootFinder implements IRootFinder {
  constructor (
    protected readonly options: RootFinderOptions,
  ) {}

  protected findUpperLimit (polynomial: Polynomial): number {
    const maxIterations = this.options.maxIterations!

    let iteration: number = 0
    let result: number = 1

    while (iteration++ < maxIterations) {
      const calculated = polynomial.calculate(result)

      if (calculated < 0) {
        return result
      }

      result *= 2
    }

    return NaN
  }

  public findRoot (polynomial: Polynomial): Root {
    const upperLimit = this.findUpperLimit(polynomial)

    if (!isValidRoot(upperLimit)) {
      return {
        converged: false,
        iterations: 0,
        value: NaN,
      }
    }

    const limits: [number, number] = [0, upperLimit]
    const epsilon = this.options.epsilon!
    const maxIterations = this.options.maxIterations!

    let iteration: number = 0
    let result: number = 0

    while (iteration++ < maxIterations) {
      const delta = Math.abs(limits[0] - limits[1])

      result = (limits[0] + limits[1]) / 2

      if (delta < epsilon) {
        return {
          converged: true,
          iterations: iteration,
          value: result,
        }
      }

      const calculated = polynomial.calculate(result)

      if (calculated < 0) {
        limits[1] = result
      } else {
        limits[0] = result
      }
    }

    return {
      converged: false,
      iterations: iteration - 1,
      value: result,
    }
  }
}
