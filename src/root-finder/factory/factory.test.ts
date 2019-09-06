import { expect } from 'chai'
import { RootFinderFactory } from './factory'
import { RootFinderMethod } from '../definition'
import { BisectionRootFinder } from '../bisection'
import { NewtonRootFinder } from '../newton'

describe('RootFinderFactory', () => {
  const factory = new RootFinderFactory({})

  describe('#make', () => {
    const cases: [RootFinderMethod, any][] = [
      [RootFinderMethod.Bisection, BisectionRootFinder],
      [RootFinderMethod.Newton, NewtonRootFinder],
    ]

    cases.forEach(([method, Class]) => {
      it(`RootFinderMethod.${method} -> ${Class.name}`, () => {
        const instance = factory.make(method)

        expect(instance).to.be.instanceOf(Class)
      })
    })
  })
})
