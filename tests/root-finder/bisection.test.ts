import { expect } from 'chai'
import { RootFinderFactory } from '../../src/root-finder/factory'
import { RootFinderMethod, RootFinderOptions, Root } from '../../src/root-finder/definition'
import { Polynomial } from '../../src/polynomial/polynomial'
import { zeros } from '../../src/utils/zeros'

const createRootFinder = (options: RootFinderOptions) => {
  const factory = new RootFinderFactory(options)
  const instance = factory.make(RootFinderMethod.Bisection)

  return instance
}

describe('BisectionRootFinder', () => {
  describe('#findRoot', () => {
    const cases: [number[], RootFinderOptions, Root][] = [
      [
        [-10, -10, 21],
        {
          epsilon: 1e-5,
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 22,
          value: 1.032970905303955,
        },
      ],
      [
        [-10, -10, 15],
        {
          epsilon: 1e-100,
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 51,
          value: 0.8228756555322954,
        },
      ],
      [
        [-10, -10, 15],
        {
          epsilon: 1e-100,
          maxIterations: 50,
        },
        {
          converged: false,
          iterations: 50,
          value: 0.8228756555322958,
        },
      ],
      [
        [-1, 1, -1, 1, -1, 1, -1, 1, 1],
        {
          epsilon: 1e-8,
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 30,
          value: 1.141179634258151,
        },
      ],
      [
        [-10, ...zeros(29), 5, ...zeros(28), 0.1],
        {
          epsilon: 1e-5,
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 21,
          value: 0.9783663749694824,
        },
      ],
    ]

    cases.forEach(([coefficients, options, expected], index) => {
      it(`passes case #${index + 1}`, () => {
        const epsilon = options.epsilon!
        const finder = createRootFinder(options)
        const polynomial = new Polynomial(coefficients)
        const root = finder.findRoot(polynomial)

        expect(root).to.deep.equal(expected)

        if (root.converged) {
          const calculated = polynomial.calculate(root.value)
          // tslint:disable-next-line no-unused-expression
          expect(calculated <= epsilon).to.be.true
        }
      })
    })
  })
})
