const MyPromise = require('./part1-7')

// console.log('global begin')
// setTimeout(function timer1() {
//   console.log('timer1 invoke')
// }, 1800)
// setTimeout(function timer2() {
//   console.log('timer2 invoke')
//   setTimeout(function inner() {
//     console.log('inner invoke')
//   }, 1000)
// }, 1000)
// console.log('global end')

// console.log(MyPromise)

// let p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('成功')
//   }, 1000)
//   // resolve('成功')
//   // reject('失败')
// })
// let p2 = p.then((res) => {
//   console.log(res)
//   return 10000
// }, (res) => {
//   console.log(res)
//   return p2
// })
// p2.then(res => {
//   console.log(res)
// }, res => {
//   console.log(res)
// })
// let p1 = new MyPromise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve('成功了')
//   })
// })

// let p2 = new MyPromise((resolve, reject) => {
//   reject('失败')
// })

// MyPromise.resolve(10).then(res=>{
//   console.log(res)
// })
// MyPromise.resolve(p1).then(res=>{
//   console.log(res)
// })

// p2.finally(res=>{
//   console.log(res)
// })
// p2.then(res=>{
//   console.log(res)
// }).catch(reason=>{
//   console.log(reason)
// })
// p2.then().then().then((res)=>{
//   console.log('第三次then 成功',res)
// },(res)=>{
//   console.log('第三次then 失败',res)
// })


let p = new MyPromise((resolve,reject)=>{
  // setTimeout(()=>{
  //   reject('失败')
  // },1000)
  resolve('成功')
  // reject('失败')
})
// let p1 = p.then(res=>{
//   return p1
// })
p.then(res=>{
  console.log(res)
  return new MyPromise((resolve,reject)=>{
    // setTimeout(()=>{
    //   reject('失败')
    // },1000)
    // resolve('成功')
    reject('失败')
  })
},res=>{
  
}).then(res=>{
  console.log(res,1111111)
},res=>[
  console.log(res)
]).then(res=>{
  console.log(res)
},res=>{
  console.log(res,3333)
})