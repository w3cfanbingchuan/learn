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
let r = new MyPromise((resolve, reject) => {
  setTimeout(()=>{
    resolve('成功....')
  },2000)
  // resolve('成功')
  // reject('失败')
})
r.then((res)=>{
  console.log(res)
  return 'aaa'
}).then((res)=>{
  console.log('成功11111111')
  console.log(res)
},(res)=>{
  console.log('失败111111')
  console.log(res)
})
