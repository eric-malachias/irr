export function isValidRoot (value: number): boolean {
  return !isNaN(value) && isFinite(value)
}
