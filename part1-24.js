// NEVER SAY DIE  never-say-die
const _ = require('lodash')


// _.toLower
const split = _.curry((sep, str) => _.split(str, sep));

const join = _.curry((sep, array) => _.join(array, sep))

const f = _.flowRight(join('-'), split(' '), _.toLower)
console.log(f('NEVER SAY DIE'))