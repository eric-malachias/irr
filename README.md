# node-irr

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
// -> 0.032970974180430046
```

### XIRR

```typescript
const xirr: (inputs: XirrInput[], options?: RootFinderOptions) => number
```

```javascript
const { xirr } = require('node-irr')
const data = [
  { amount: -10, date: '20180101' },
  { amount: 5, date: '20180201' },
  { amount: 0.1, date: '20180301' },
]

console.log(xirr(data))
// -> { days: 60, rate: -0.020988389740661084 }
```

### Using Options

#### options.epsilon

- type: number
- default: 10<sup>-5</sub>
- description: Acceptable absolute difference between the function calculated at x<sub>0</sub> and at the exact root, |f(x<sub>0</sub>)| ≤ &epsilon;.


#### options.estimate

- type: number | 'auto'
- default: 'auto'
- description: Used the initial value for the Newton Method (`RootFinderMethod.Newton`).

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
