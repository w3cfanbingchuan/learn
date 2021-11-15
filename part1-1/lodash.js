// const _ = require('lodash')

// const array = ['jack', 'tom', 'lucy', 'kate']
// // console.log(_.first(array))

// // 函数组合
// function compose(f, g) {
//   return function (value) {
//     return f(g(value))
//   }
// }

// function reverse(array) {
//   return array.reverse()
// }
// function firseRe(array) {
//   return array[0]
// }

// const last = compose(firseRe, reverse);
// let arr = [1,2,3,4,5]
// console.log(last(arr))

const fp = require('lodash/fp')
// 数据
// horsepower 马力, dollar_value 价格, in_stock 库存
const cars = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true
},
{
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false
},
{
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false
},
{
  name: 'Audi R8',
  horsepower: 625,
  dollar_value: 114200,
  in_stock: false
},
{
  name: 'Aston Martin One-7',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true
},
{
  name: 'Pagani Huayara',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: true
}
]

const log = (val) => {
  console.log(val);
  return val;
}


let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.flowRight(fp.join(','), _underscore, fp.split(','), fp.map(fp.lowerCase), fp.map('name'))
console.log(sanitizeNames(cars))
