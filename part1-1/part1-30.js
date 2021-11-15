// import fp from 'lodash/fp'

// class IO{
//   construcrtor(value){
//     return new IO(function(){

//     })
//   }
// }
const fp = require('lodash/fp')
class Maybe {
  static of(value) {
    return new Maybe(value)
  }
  constructor(value) {
    this._value = value
  }
  isNothing() {
    return this._value == undefined || this._value == null
  }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}



// let ex1 = (v) => {
//   return fp.map(fp.add(1),v)
// }

// let maybe = Maybe.of([5, 6, 1])


// console.log( maybe.map(ex1) )




class Container {
  static of(v) {
    return new Container(v)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
}

let ex2 = (v) => {
  return fp.first(v)
}

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
// console.log(xs.map(ex2))

const log = (val) => {
  console.log(val);
  return val;
}

let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }

// 1.实现 ex3
let ex3 = () => {
  return Maybe.of(user).map(v => {
    return safeProp('name', v).map(fp.first)._value
  })
}
// 2.测试打印
// console.log(ex3()) // Maybe { _value: 'A' }





let ex4 = (value) => {
  return Maybe.of(value).map(v=>{
    return parseInt(v)
  })
}
console.log(ex4('7R'))   // Maybe { _value: 7 }
console.log(ex4('7.6B'))  // Maybe { _value: 7 }
console.log(ex4('8.2G')) // Maybe { _value: 8 }

console.log(ex4(null))      // Maybe { _value: null }
console.log(ex4(undefined)) // Maybe { _value: undefined }

console.log(ex4('i7.5'))    // Maybe { _value: NaN }
console.log(ex4('abc'))     // Maybe { _value: NaN }
