// Functor(函子)


// class Container{
//   constructor(value){
//     this._value = value
//   }
//   map(fn){
//     return new Container(fn(this._value))
//   }
// }
// let f = new Container(5)
//         .map(v => v+1)
//         .map(v=>v*v)

//         console.log(f) 

class Container{
 static of(value){
   return new Container(value)
 }
 constructor(value){
   this._value = value
 }
 map(fn){
  return Container.of(fn(this._value))
 }
}

let f = new Container(9)
        .map(v => v+1)
        .map(v=>v*v)

        console.log(f) 