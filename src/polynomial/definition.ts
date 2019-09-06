import { RootFinderOptions, Root } from '../root-finder'

export interface IPolynomial {
  calculate (x: number): number
  findRoot (options?: RootFinderOptions): Root
}
