import moment from 'moment'
import { XirrInput, InternalXirrInput } from './definition'

export function transform (inputs: XirrInput[]): InternalXirrInput[] {
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
