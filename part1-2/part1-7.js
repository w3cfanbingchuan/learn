// let promise = new Promise(function(resolve,reject){
//   setTimeout(function(){
//     resolve(100)
//   },1000)

// const { reject } = require("lodash")

//   // reject('is error')
// })
// promise.then(function(res){
//   console.log('success',res)
// },function(err){
//   console.log('error:',err)
// })
// console.log(111111)

const PENDING = 'pending'
const FULFILED = 'fulfiled'
const REJECTED = 'rejected'

class MyPromise {

  constructor(fn) {
    fn(this.resolve, this.reject)
  }
  status = PENDING
  value = undefined;
  resolveCallBack = []
  rejectCallBack = []
  resolve = value => {
    // 判断当前状态 如果不是padding状态 则不可更改
    if (this.status !== PENDING) return;
    this.status = FULFILED;
    this.value = value;
    while (this.resolveCallBack.length) {
      this.resolveCallBack.shift()()
    }
  }

  reject = value => {
    console.log(this.status,'初始')
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.value = value;
    console.log(this.status,'更改后')
    while (this.rejectCallBack.length) {
      this.rejectCallBack.shift()()
    }
  }

  then(resolveCallBack, rejectCallBack) {
    resolveCallBack = resolveCallBack ? resolveCallBack : value => value
    rejectCallBack = rejectCallBack ? rejectCallBack : value => value
    let promise2 = new MyPromise((resolve, reject) => {
      console.log(this.status,'1111111')
      if (this.status == FULFILED) {
        setTimeout(() => {
          let res = resolveCallBack(this.value)
          resolvePromise(res, promise2, resolve, reject)
        }, 0)

      } else if (this.status == REJECTED) {
        setTimeout(() => {
          let res = rejectCallBack(this.value)
          resolvePromise(res, promise2, resolve, reject)
        }, 0)
      } else {
        this.resolveCallBack.push(() => {
          setTimeout(() => {
            let res = resolveCallBack(this.value)
            resolvePromise(res, promise2, resolve, reject)
          }, 0)
        })
        this.rejectCallBack.push(() => {
          setTimeout(() => {
            let res = rejectCallBack(this.value)
            resolvePromise(res, promise2, resolve, reject)
          }, 0)
        })
      }
    })
    return promise2;
  }

  finally(callBack) {
    console.log(this.status)
    return this.then(value=>{
      return MyPromise.resolve(callBack()).then(()=>value)
    },(reason)=>{
      return MyPromise.resolve(callBack()).then(()=>{throw reason})
    })
  }
  catch(failCallBack){
    return this.then(undefined,failCallBack)
  }

  static all(array) {
    let result = []

    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        for (let i = 0, len = array.length; i < len; i++) {
          if (array[i] instanceof MyPromise) {
            array[i].then((value) => result.push(value), reason => reject(reason))
          } else {
            result.push(array[i])
          }
        }
        resolve(result)
      }, 0)

    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new Promise(resolve => resolve(value))
  }
}
function resolvePromise(backPromise, curPromise, resolve, reject) {
  if (backPromise === curPromise) {
    return reject(new TypeError('调用promise重复'))
  }
  if (backPromise instanceof MyPromise) {
    backPromise.then(resolve, reject)
  } else {
    resolve(backPromise)
  }
}


module.exports = MyPromise;