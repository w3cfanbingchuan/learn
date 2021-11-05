const _ = require('lodash');
const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = s => s.toUpperCase()

const f = flowRight(toUpper, first, reverse)

console.log(f(['aaa','bbb','ccc','ddd']))

function flowRight(...args){
  return function(value){
    return args.reverse().reduce(function (acc,fn){
      return fn(acc)
    },value)
  }
}