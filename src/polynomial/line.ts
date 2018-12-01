import { IPolynomial } from './definition'

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
  public getK (): number {
    return this.k
  }
  public getM (): number {
    return this.m
  }
}
