import { expect } from 'chai'
import { RootFinderFactory } from '../factory'
import { RootFinderMethod, RootFinderOptions, Root } from '../definition'
import { Polynomial } from '../../polynomial'
import { zeros } from '../../utils'

const createRootFinder = (options: RootFinderOptions) => {
  const factory = new RootFinderFactory(options)
  const instance = factory.make(RootFinderMethod.Newton)

  return instance
}

describe('NewtonRootFinder', () => {
  describe('#findRoot', () => {
    const cases: [number[], RootFinderOptions, Root][] = [
      [
        [-10, -10, 21],
        {
          epsilon: 1e-8,
          estimate: 'auto',
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 3,
          value: 1.0329709716755893,
        },
      ],
      [
        [-10, -10, 15],
        {
          epsilon: 1e-100,
          estimate: 'auto',
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 5,
          value: 0.8228756555322954,
        },
      ],
      [
        [-10, -10, 15],
        {
          epsilon: 1e-100,
          estimate: 'auto',
          maxIterations: 4,
        },
        {
          converged: false,
          iterations: 4,
          value: 0.8228756555322954,
        },
      ],
      [
        [-1, 1, -1, 1, -1, 1, -1, 1, 1],
        {
          epsilon: 1e-8,
          estimate: 'auto',
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 6,
          value: 1.1411796348542165,
        },
      ],
      [
        [-10, ...zeros(29), 5, ...zeros(28), 0.1],
        {
          epsilon: 1e-8,
          estimate: 'auto',
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 6,
          value: 0.9783664859233557,
        },
      ],
      [
        [-10, ...zeros(29), 5, ...zeros(28), 0.1],
        {
          epsilon: 1e-8,
          estimate: 0.5,
          maxIterations: 1000,
        },
        {
          converged: false,
          iterations: 1,
          value: -185127.41863258032,
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
