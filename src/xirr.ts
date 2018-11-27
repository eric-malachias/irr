import moment from 'moment'
import { PolynomialSolutionOptions, DEFAULT_POLYNOMIAL_SOLUTION_OPTIONS } from './polynomial'
import { irr } from '.'

export type XirrInput = {
  amount: number,
  date: string,
}

function transform (inputs: XirrInput[]) {
  if (inputs.length === 0) {
    return []
  }

  const { date } = inputs[0]
  const transformedInputs = inputs.map(input => ({
    amount: input.amount,
    day: moment(input.date).diff(moment(date), 'days'),
  }))
  const firstDay = Math.min(...transformedInputs.map(({ day }) => day))

  if (firstDay !== 0) {
    transformedInputs.forEach((_, index) => transformedInputs[index].day -= firstDay)
  }

  return transformedInputs
}

export function xirr (
  inputs: XirrInput[],
  options: PolynomialSolutionOptions = DEFAULT_POLYNOMIAL_SOLUTION_OPTIONS,
) {
  const transformedInputs = transform(inputs)
  const days = transformedInputs.map(input => input.day)
  const firstDay = Math.min(...days)
  const lastDay = Math.max(...days)
  const totalDays = lastDay - firstDay + 1
  const coefficients = new Array(totalDays).fill(0)

  transformedInputs.forEach(({ amount, day }) => coefficients[day] = amount)

  return {
    days: totalDays,
    rate: irr(coefficients, options),
  }
}
