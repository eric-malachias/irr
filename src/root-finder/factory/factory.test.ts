import { IRootFinderConstructor, RootFinderFactory } from './factory'
import { RootFinderMethod } from '../definition'
import { BisectionRootFinder } from '../bisection'
import { NewtonRootFinder } from '../newton'
import { getRootFinderOptionsWithDefaults } from '..'

describe('RootFinderFactory', () => {
  const factory = new RootFinderFactory(getRootFinderOptionsWithDefaults({}))

  describe('#make', () => {
    const cases: [RootFinderMethod, IRootFinderConstructor][] = [
      [RootFinderMethod.Bisection, BisectionRootFinder],
      [RootFinderMethod.Newton, NewtonRootFinder],
    ]

    cases.forEach(([method, Class]) => {
      test(`RootFinderMethod.${method} -> ${Class.name}`, () => {
        const instance = factory.make(method)

        expect(instance).toBeInstanceOf(Class)
      })
    })

    test('throw error for invalid values', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => factory.make(null as any)).toThrow()
    })
  })
})
