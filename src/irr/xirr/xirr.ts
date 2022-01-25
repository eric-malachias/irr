import { irr } from '../irr'
import { RootFinderOptions } from '../../root-finder'
import { XirrInput } from '../definition'
import { transform } from '../transform'
import { zeros } from '../../utils'

export function xirr(
  inputs: XirrInput[],
  options: Partial<RootFinderOptions> = {},
): { days: number; rate: number } {
  const transformedInputs = transform(inputs)
  const days = transformedInputs.map(input => input.day)
  const firstDay = Math.min(...days)
  const lastDay = Math.max(...days)
  const totalDays = lastDay - firstDay + 1
  const coefficients: number[] = zeros(totalDays)

  transformedInputs.forEach(({ amount, day }) => (coefficients[day] += amount))

  return {
    days: totalDays,
    rate: irr(coefficients, options),
  }
}
