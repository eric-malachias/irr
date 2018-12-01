// tslint:disable no-console
import { xirr } from './src/xirr'
import { RootFinderMethod } from './src/root-finder/definition'

const data = [
  { amount: -10, date: '20180101' },
  { amount: 5, date: '20180201' },
  { amount: 0.1, date: '20180301' },
]

const { rate: daily, days } = xirr(data, {
  // this initial estimate fails when using newton method
  estimate: 0.9,
  epsilon: 1e-5,
  // when the primary method fails, the secondary one is tried
  fallbackMethod: RootFinderMethod.Bisection,
  maxIterations: 100,
  method: RootFinderMethod.Newton,
})
const annually = Math.pow(daily + 1, 365) - 1
const period = Math.pow(daily + 1, days) - 1

const $ = (x: number) => `${(x * 100).toFixed(4)}%`

console.log('--------------------------------')
console.log('daily:    %s', $(daily))
console.log('annually: %s', $(annually))
console.log('period:   %s (%d days)', $(period), days)
console.log('--------------------------------')
