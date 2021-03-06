const fp = require('lodash/fp')
class IO {
  static of(value) {
    return new IO(function () {
      return value
    })
  }
  constructor(fn) {
    this._value = fn;
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

let r = IO.of(22).map(v=>v*3)._value()
console.log(r)
