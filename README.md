# node-irr

A Node.js package that provides easy and customizable ways to calculate internal rate of return.

## Installation

```bash
# using yarn
yarn add node-irr

# using npm
npm install node-irr --save
```

## Usage

```javascript
// irr
const { irr } = require('node-irr')
const data = [-10, -10, 21]

console.log(irr(data))

// xirr
const { xirr } = require('node-irr')
const data = [
  { amount: -10, date: '20180101' },
  { amount: 5, date: '20180201' },
  { amount: 0.1, date: '20180301' },
]

console.log(xirr(data))
```


