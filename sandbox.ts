import { xirr } from './src/xirr'

const data = [
  { amount: -10, date: '20180101' },
  { amount: -10, date: '20180201' },
  { amount: 22, date: '20180301' },
]

const { rate: daily, days } = xirr(data, {
  estimate: 'auto',
  epsilon: 1e-5,
  maxIterations: 10000,
})
const annually = Math.pow(daily + 1, 365) - 1
const period = Math.pow(daily + 1, days) - 1

const $ = (x: number) => `${(x * 100).toFixed(4)}%`

console.log('--------------------------------')
console.log('daily:    %s', $(daily))
console.log('annually: %s', $(annually))
console.log('period:   %s (%d days)', $(period), days)
console.log('--------------------------------')
