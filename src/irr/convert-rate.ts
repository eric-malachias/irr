export enum RateInterval {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

function parseInterval (interval: RateInterval | number): number {
  switch (interval) {
    case RateInterval.Day:
      return 1
    case RateInterval.Week:
      return 7
    case RateInterval.Month:
      return 30
    case RateInterval.Year:
      return 365
  }

  return interval
}

export function convertRate (
  rate: number,
  toInterval: RateInterval | number,
  fromInterval: RateInterval | number = RateInterval.Day,
): number {
  return (1 + rate) ** (parseInterval(toInterval) / parseInterval(fromInterval)) - 1
}
