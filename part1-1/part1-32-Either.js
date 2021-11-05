class Left{
  static of(value){
    return new Left(value)
  }
  constructor(value){
    this._value = value
  }

  map(){
    return this
  }
}

class Right{
  static of(value){
    return new Right(value)
  }
  constructor(value){
    this._value = value
  }
  map(fn){
    return Right.of(fn(this.value))
  }
}

function parseJSON(str){
  try{
    return Right.of(JSON.parse(str))
  }
  catch(msg){
    return Left.of({error:msg})
  }
}
const r = parseJSON('{"name":"ZS"}')
console.log(r)