import { Polynomial } from '../polynomial/polynomial'

export enum RootFinderMethod {
  Bisection = 'Bisection',
  Newton = 'Newton',
}

export type RootFinderOptions = {
  estimate?: number | 'auto',
  epsilon?: number,
  fallbackMethod?: RootFinderMethod | null,
  maxIterations?: number,
  method?: RootFinderMethod,
}

export interface IRootFinder {
  findRoot (polynomial: Polynomial): number
}

export const DEFAULT_ROOT_FINDER_OPTIONS: RootFinderOptions = {
  estimate: 'auto',
  epsilon: 1e-5,
  fallbackMethod: RootFinderMethod.Bisection,
  maxIterations: 10,
  method: RootFinderMethod.Newton,
}
