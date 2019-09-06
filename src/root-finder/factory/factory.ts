import { RootFinderMethod, IRootFinder, RootFinderOptions } from '../definition'
import { BisectionRootFinder } from '../bisection'
import { NewtonRootFinder } from '../newton'

export class RootFinderFactory {
  constructor (
    protected readonly options: RootFinderOptions,
  ) {}

  public make (method: RootFinderMethod): IRootFinder {
    switch (method) {
      case RootFinderMethod.Bisection:
        return new BisectionRootFinder(this.options)
      case RootFinderMethod.Newton:
        return new NewtonRootFinder(this.options)
      default:
        throw new Error(`RootFinderFactory ${method} not implemented.`)
    }
  }
}
