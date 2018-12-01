import { RootFinderOptions, IRootFinder } from './definition'
import { Polynomial } from '../polynomial'

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

  public findRoot (polynomial: Polynomial): number {
    const upperLimit = this.findUpperLimit(polynomial)

    if (isNaN(upperLimit) || !isFinite(upperLimit)) {
      return NaN
    }

    const limits: [number, number] = [0, upperLimit]
    const epsilon = this.options.epsilon!
    const maxIterations = this.options.maxIterations!

    let iteration: number = 0
    let result: number = 0

    while (iteration++ < maxIterations) {
      result = (limits[0] + limits[1]) / 2

      const calculated = polynomial.calculate(result)

      if (Math.abs(calculated) < epsilon) {
        return result
      }

      if (calculated < 0) {
        limits[1] = result
      } else {
        limits[0] = result
      }
    }

    return result
  }
}
