import differenceInDays from 'date-fns/differenceInDays'
import { XirrInput, InternalXirrInput } from './definition'

const dateFormat = /(\d{4})(\d{2})(\d{2})/

/**
 * @param input a date string formatted like yyyyMMdd
 */
function parseDate (input: string): Date {
  const result = dateFormat.exec(input)
  if (result === null) {
    throw new Error('Date format error')
  }

  const [, year, month, day] = result
  return new Date(
    Number.parseInt(year),
    Number.parseInt(month) - 1,
    Number.parseInt(day)
  )
}

export function transform (inputs: XirrInput[]): InternalXirrInput[] {
  if (inputs.length === 0) {
    return []
  }

  const { date } = inputs[0]
  const transformedInputs = inputs.map(input => ({
    amount: input.amount,
    day: differenceInDays(
      parseDate(input.date),
      parseDate(date)
    )
  }))
  const firstDay = Math.min(...transformedInputs.map(({ day }) => day))

  if (firstDay !== 0) {
    transformedInputs.forEach((_, index) => transformedInputs[index].day -= firstDay)
  }

  return transformedInputs
}
