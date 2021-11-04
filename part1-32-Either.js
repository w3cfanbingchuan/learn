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
    Right.of(JSON.parse(str))
  }
  catch(err){
    Left.map(err)
  }
}
