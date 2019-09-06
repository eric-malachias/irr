import { expect } from 'chai'
import { RootFinderFactory } from '../factory'
import { RootFinderMethod, RootFinderOptions, Root } from '../definition'
import { Polynomial } from '../../polynomial'
import { zeros } from '../../utils'

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
          epsilon: 1e-8,
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 29,
          value: 1.0329709686338902,
        },
      ],
      [
        [-10, -10, 15],
        {
          epsilon: 1e-15,
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
          epsilon: 1e-15,
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
          iterations: 29,
          value: 1.141179632395506,
        },
      ],
      [
        [-10, ...zeros(29), 5, ...zeros(28), 0.1],
        {
          epsilon: 1e-8,
          maxIterations: 1000,
        },
        {
          converged: true,
          iterations: 28,
          value: 0.9783664830029011,
        },
      ],
    ]

    cases.forEach(([coefficients, options, expected], index) => {
      it(`passes case #${index + 1}`, () => {
        const finder = createRootFinder(options)
        const polynomial = new Polynomial(coefficients)
        const root = finder.findRoot(polynomial)

        expect(root).to.deep.equal(expected)
      })
    })
  })
})
