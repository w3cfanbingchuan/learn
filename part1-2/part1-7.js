// let promise = new Promise(function(resolve,reject){
//   setTimeout(function(){
//     resolve(100)
//   },1000)

//   // reject('is error')
// })
// promise.then(function(res){
//   console.log('success',res)
// },function(err){
//   console.log('error:',err)
// })
// console.log(111111)
const PADDING = 'padding'
const FULFILLED = 'fulfulled'
const REJECTED = 'rejected'
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  status = PADDING
  successValue = undefined;
  rejValue = undefined;
  successCallBack = [];
  failCallBack = [];
  resolve = (value) => {
    if (this.status != PADDING) return;
    this.status = FULFILLED
    this.successValue = value;
    // this.successCallBack && this.successCallBack(this.successValue)
    while (this.successCallBack.length) {
      this.successCallBack.shift()(this.successValue)
    }
  }

  reject = (value) => {
    if (this.status != PADDING) return;
    this.status = REJECTED
    this.rejValue = value
    console.log(value)
    // this.failCallBack && this.failCallBack(this.rejValue)
    while (this.failCallBack.length) {
      this.failCallBack.shift()(this.rejValue)
    }
  }
  then(fulCallBack, rejectCallBack) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          let x = fulCallBack(this.successValue)
          resolvePromise(promise2, x, resolve, reject)
        })

      } else if (this.status === REJECTED) {
        setTimeout(() => {
          let r = rejectCallBack(this.rejValue)
          resolvePromise(promise2, r, resolve, reject)
        })
      } else {
        this.successCallBack.push(()=>{
          fulCallBack(this.successValue)
        });
        this.failCallBack.push(rejectCallBack);
      }
    })
    return promise2

  }

}
function resolvePromise(sePromie, promise, resolve, reject) {
  if (promise === sePromie) {
    return reject('不能自己重复调用')
  }
  if (promise instanceof MyPromise) {
    promise.then(resolve, reject)
  } else {
    resolve(promise)
  }
}

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
  console.log(res)
})

// module.exports = MyPromise