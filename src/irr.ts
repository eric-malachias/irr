import { Polynomial, PolynomialSolutionOptions, DEFAULT_POLYNOMIAL_SOLUTION_OPTIONS } from './polynomial'

export function irr (
  coefficients: number[],
  options: PolynomialSolutionOptions = DEFAULT_POLYNOMIAL_SOLUTION_OPTIONS,
): number {
  const polynomial = new Polynomial(coefficients)

  return polynomial.solve(options)
}
