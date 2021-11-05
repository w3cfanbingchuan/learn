const fp = require('lodash/fp');
const f = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.split(' '), fp.toUpper)
console.log(f('world will web'))