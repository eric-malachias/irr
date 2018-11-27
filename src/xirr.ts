import { PolynomialSolutionOptions, DEFAULT_POLYNOMIAL_SOLUTION_OPTIONS } from './polynomial'
import { irr } from '.'

export type XirrAmount = {
  amount: number,
  day: number,
}

export function xirr (
  amounts: XirrAmount[],
  options: PolynomialSolutionOptions = DEFAULT_POLYNOMIAL_SOLUTION_OPTIONS,
): number {
  const days = amounts.map(amount => amount.day)
  const firstDay = Math.min(...days)
  const lastDay = Math.max(...days)
  const coefficients = new Array(lastDay - firstDay + 1).fill(0)

  amounts.forEach(({ amount, day }) => coefficients[day] = amount)

  return irr(coefficients, options)
}
