const fp = require('lodash/fp')
const f = fp.flowRight(fp.join('-'), fp.split(' '), fp.toLower)

console.log(f('NEVER SAY DIE'))