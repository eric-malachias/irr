# node-irr

![](https://github.com/eric-malachias/irr/workflows/passing/badge.svg)
[![Downloads](https://img.shields.io/npm/dm/node-irr.svg)](https://www.npmjs.com/package/node-irr)

A Node.js package that provides an easy and customizable way to calculate internal rate of return.

## Installation

```bash
# using yarn
yarn add node-irr

# using npm
npm install node-irr --save
```

## Usage

### IRR

```typescript
const irr: (values: number[], options?: RootFinderOptions) => number
```

```javascript
const { irr } = require('node-irr')
const data = [-10, -10, 21]

console.log(irr(data))
// -> 0.03297097167558927
// -> ~3.29%
```

### XIRR

```typescript
const xirr: (inputs: XirrInput[], options?: RootFinderOptions) => { days: number, rate: number }
```

```javascript
const { xirr } = require('node-irr')
const data = [
  // currently accepted formats for strings:
  // YYYYMMDD, YYYY-MM-DD, YYYY/MM/DD
  { amount: -10, date: '20180101' },
  { amount: 10, date: '20180201' },
  { amount: 0.05, date: '20180301' },
]
// or
const data = [
  { amount: -10, date: new Date(2018, 0, 1) },
  { amount: 10, date: new Date(2018, 1, 1) },
  { amount: 0.05, date: new Date(2018, 2, 1) },
]

console.log(xirr(data))
// -> { days: 60, rate: 0.0001601831164046441 }
//                      ^^^^^^^^^^^^^^^^^^^^^ -> daily rate
// -> ~0.016% per day
// -> ~6.02% per year
```

### Using Options

#### options.epsilon

- type: number
- default: 10<sup>-8</sub>
- description: Maximum acceptable absolute distance between exact root (x<sub>0</sub>) and approximate root (&lambda;), |x<sub>0</sub> - &lambda;| < &epsilon;.


#### options.estimate

- type: number | 'auto'
- default: 'auto'
- description: Used as the initial value for the Newton Method (`RootFinderMethod.Newton`).

#### options.fallbackMethod

- type: RootFinderMethod
- default: `RootFinderMethod.Newton` ('newton')
- description: Method to use to find the root.

#### options.maxIterations

- type: number
- default: 100
- description: Number of iterations to go through before stopping if an acceptable approximated root is not found.

##### options.method

- type: RootFinderMethod
- default: `RootFinderMethod.Bisection` ('bisection')
- description: Method to use to find the root if the primary one (`options.method`) fails.

### Newton vs Bisection

The `Newton Method` (1) is considerably faster in number of iterations than the `Bisection Method` (2), but sometimes fails depending on the initial estimate, which is why (1) is used as the primary method, and (2) as a fallback.

### Helper Functions

#### convertRate

```typescript
export enum RateInterval {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}
const convertRate: (rate: number, toInterval: RateInterval | number, fromInterval: RateInterval | number = RateInterval.Day) => number
```

```javascript
const { convertRate } = require('node-irr')

const rate = 0.0004 // ~ 0.04% (day)
const annualRate = convertRate(rate, 'year') // ~15.7%
// or
const annualRate = convertRate(rate, 365) // ~15.7%
```
