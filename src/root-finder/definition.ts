import { Polynomial } from '../polynomial'

export enum RootFinderMethod {
  Bisection = 'bisection',
  Newton = 'newton',
}

export type RootFinderOptions = {
  epsilon?: number,
  estimate?: number | 'auto',
  fallbackMethod?: RootFinderMethod | null,
  maxIterations?: number,
  method?: RootFinderMethod,
}

export type Root = {
  converged: boolean,
  iterations: number,
  value: number,
}

export interface IRootFinder {
  findRoot (polynomial: Polynomial): Root
}

export const DEFAULT_ROOT_FINDER_OPTIONS: RootFinderOptions = {
  estimate: 'auto',
  epsilon: 1e-8,
  fallbackMethod: RootFinderMethod.Bisection,
  maxIterations: 100,
  method: RootFinderMethod.Newton,
}
