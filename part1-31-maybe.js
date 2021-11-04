class Maybe {
  static of(value) {
    return new Maybe(value);
  }
  constructor(value) {
    this._value = value
  }
  isNothing() {
    return this._value === null || this._value === undefined;
  }
  map(fn){
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
  }
}

let r = Maybe.of("hello world")
              .map(x=>x.toUpperCase())
console.log(r)
