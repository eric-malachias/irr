import { DEFAULT_ROOT_FINDER_OPTIONS, RootFinderOptions } from './root-finder/definition'
import { RootFinderFactory } from './root-finder/factory'

export interface IPolynomial {
  calculate (x: number): number
  findRoot (options?: RootFinderOptions): number
}

export class Polynomial implements IPolynomial {
  protected derivative: Polynomial | null = null

  constructor (
    protected readonly coefficients: number[],
  ) {}

  protected getDegree (): number {
    return this.coefficients.length - 1
  }

  public calculate (x: number): number {
    const degree = this.getDegree()
    let accumulatedX: number = 1
    let result: number = 0

    for (let index = degree; index >= 0; index--) {
      result += accumulatedX * this.coefficients[index]
      accumulatedX *= x
    }

    return result
  }
  public differentiate (): Polynomial {
    if (this.derivative) {
      return this.derivative
    }

    const degree = this.getDegree()
    const coefficients: number[] = []

    this.coefficients.forEach((coefficient, index) => {
      if (index === degree) {
        return
      }

      coefficients.push(coefficient * (degree - index))
    })

    return this.derivative = new Polynomial(coefficients)
  }
  public findRoot (options: RootFinderOptions): number {
    options = Object.assign({}, DEFAULT_ROOT_FINDER_OPTIONS, options)

    const factory = new RootFinderFactory(options)
    const finder = factory.make(options.method!)

    const root = finder.findRoot(this)

    if (options.fallbackMethod
      && isNaN(root) || !isFinite(root)
      && options.method !== options.fallbackMethod) {
      const fallbackFinder = factory.make(options.fallbackMethod!)

      return fallbackFinder.findRoot(this)
    }

    return root
  }
  public getCoefficients (): number[] {
    return this.coefficients
  }
  public getTangentAt (x: number): Line {
    const derivative = this.differentiate()
    const m = derivative.calculate(x)
    const k = this.calculate(x) - m * x

    return new Line(m, k)
  }
}
export class Line implements IPolynomial {
  constructor (
    protected readonly m: number,
    protected readonly k: number,
  ) {}

  public calculate (x: number): number {
    return this.m * x + this.k
  }
  public findRoot (): number {
    return -this.k / this.m
  }
}
