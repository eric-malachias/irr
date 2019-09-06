import { IPolynomial } from '../definition'
import { Root } from '../../root-finder'

export class Line implements IPolynomial {
  constructor (
    protected readonly m: number,
    protected readonly k: number,
  ) {}

  public calculate (x: number): number {
    return this.m * x + this.k
  }
  public findRoot (): Root {
    return {
      converged: true,
      iterations: 0,
      value: -this.k / this.m,
    }
  }
  public getK (): number {
    return this.k
  }
  public getM (): number {
    return this.m
  }
}
