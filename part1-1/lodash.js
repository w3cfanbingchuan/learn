const _ = require('lodash')
const { first } = require('lodash')

const array = ['jack', 'tom', 'lucy', 'kate']
// console.log(_.first(array))

// 函数组合
function compose(f, g) {
  return function (value) {
    return f(g(value))
  }
}

function reverse(array) {
  return array.reverse()
}
function firseRe(array) {
  return array[0]
}

const last = compose(firseRe, reverse);
let arr = [1,2,3,4,5]
console.log(last(arr))
