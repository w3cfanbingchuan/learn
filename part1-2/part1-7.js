// let promise = new Promise(function(resolve,reject){
//   setTimeout(function(){
//     resolve(100)
//   },1000)
// promise.then(function(res){
//   console.log('success',res)
// },function(err){
//   console.log('error:',err)
// })
// console.log(111111)

// const PENDING = 'pending'
// const FULFILED = 'fulfiled'
// const REJECTED = 'rejected'

// class MyPromise {

//   constructor(fn) {
//     try {
//       fn(this.resolve, this.reject)
//     } catch (res) {
//       this.reject(res)
//     }

//   }
//   status = PENDING
//   value = undefined;
//   resolveCallBack = []
//   rejectCallBack = []
//   resolve = value => {
//     // 判断当前状态 如果不是padding状态 则不可更改
//     if (this.status !== PENDING) return;
//     this.status = FULFILED;
//     this.value = value;
//     while (this.resolveCallBack.length) {
//       this.resolveCallBack.shift()()
//     }
//   }

//   reject = value => {
//     if (this.status !== PENDING) return;
//     this.status = REJECTED;
//     this.value = value;
//     while (this.rejectCallBack.length) {
//       this.rejectCallBack.shift()()
//     }
//   }

//   then(resolveCallBack, rejectCallBack) {
//     resolveCallBack = resolveCallBack ? resolveCallBack : value => value
//     rejectCallBack = rejectCallBack ? rejectCallBack : reason => {
//       throw reason
//     }
//     let promise2 = new MyPromise((resolve, reject) => {
//       if (this.status == FULFILED) {
//         setTimeout(() => {
//           try {
//             let res = resolveCallBack(this.value)
//             resolvePromise(res, promise2, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }

//         }, 0)

//       } else if (this.status == REJECTED) {
//         setTimeout(() => {
//           try {
//             let res = rejectCallBack(this.value)
//             resolvePromise(res, promise2, resolve, reject)
//           } catch (error) {
//             reject(error)
//           }

//         }, 0)
//       } else {
//         this.resolveCallBack.push(() => {
//           setTimeout(() => {
//             try {
//               let res = resolveCallBack(this.value)
//               resolvePromise(res, promise2, resolve, reject)
//             } catch (error) {
//               reject(error)
//             }

//           }, 0)
//         })
//         this.rejectCallBack.push(() => {
//           setTimeout(() => {
//             try {
//               let res = rejectCallBack(this.value)
//               resolvePromise(res, promise2, resolve, reject)
//             } catch (error) {
//               reject(error)
//             }
//           }, 0)
//         })
//       }
//     })
//     return promise2;
//   }

//   finally(callBack) {
//     return this.then(value => {
//       return MyPromise.resolve(callBack()).then(() => value)
//     }, (reason) => {
//       return MyPromise.resolve(callBack()).then(() => { throw reason })
//     })
//   }
//   catch(failCallBack) {
//     return this.then(undefined, failCallBack)
//   }

//   static all(array) {
//     let result = []

//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         for (let i = 0, len = array.length; i < len; i++) {
//           if (array[i] instanceof MyPromise) {
//             array[i].then((value) => result.push(value), reason => reject(reason))
//           } else {
//             result.push(array[i])
//           }
//         }
//         resolve(result)
//       }, 0)

//     })
//   }

//   static resolve(value) {
//     if (value instanceof MyPromise) return value;
//     return new Promise(resolve => resolve(value))
//   }
// }
// function resolvePromise(backPromise, curPromise, resolve, reject) {
//   if (backPromise === curPromise) {
//     return reject(new TypeError('调用promise重复'))
//   }
//   if (backPromise instanceof MyPromise) {
//     backPromise.then(resolve, reject)
//   } else {
//     resolve(backPromise)
//   }
// }

const PENDING = 'Pending'
const FULFILLED = 'Fulfilled'
const REJECTED = 'Rejected'
class MyPromise {
  constructor(fn) {
    try {
      // 如果代码没有异常 则自执行函数
      fn(this.resolve, this.reject)
    } catch (error) {
      // 否则执行失败的回调
      this.reject(error)
    }
  }
  value = undefined;
  static = PENDING  // 初始化static状态为 Pending
  onFulfilledCallBack = [] // 初始化 成功回调
  onRejectedCallBack = [] // 初始化 失败回调
  resolve = value => {
    // 如果状态不是Pending 则无法修改当前状态
    if (this.static !== PENDING) return;
    // 将状态更改为Fulfilled
    this.static = FULFILLED;
    this.value = value
    while (this.onFulfilledCallBack.length) {
      this.onFulfilledCallBack.shift()()
    }
  }
  reject = reason => {
    // 如果状态不是Pending 则无法修改当前状态
    if (this.static !== PENDING) return;
    // 将状态更改为Rejected
    this.static = REJECTED;
    this.value = reason
    // 依次调用then回调
    while (this.onRejectedCallBack.length) {
      this.onRejectedCallBack.shift()()
    }
  }
  then(onFulfilled, onRejected) {


    // onFulfilled = onFulfilled ? onFulfilled : value => value;
    // onRejected = onRejected ? onRejected : reason => { throw reason };
    let MyPromise2 = new MyPromise((resoleve, reject) => {
      if (this.static === FULFILLED) {
        setTimeout(() => {
          // then中 如果执行异常则执行reject 否则执行成功回调
          try {
            if (Object.prototype.toString.call(onFulfilled) !== '[object Function]') {
              resoleve(this.value)
            } else {
              let x = onFulfilled(this.value)
              // 提取公共方法
              promiseCallBack(x, MyPromise2, resoleve, reject)
            }
          } catch (error) {
            reject(error)
          }

        }, 0)

      } else if (this.static === REJECTED) {
        setTimeout(() => {
          try {
            if (Object.prototype.toString.call(onFulfilled) !== '[object Function]') {
              reject(this.value)
            } else {
              let x = onRejected(this.value)
              promiseCallBack(x, MyPromise2, resoleve, reject)
            }
          } catch (error) {
            reject(error)
          }

        }, 0)
      } else {
        this.onFulfilledCallBack.push(() => {
          setTimeout(() => {
            try {
              if (Object.prototype.toString.call(onFulfilled) !== '[object Function]') {
                resoleve(this.value)
              } else {
                let x = onFulfilled(this.value)
                // 提取公共方法
                promiseCallBack(x, MyPromise2, resoleve, reject)
              }
            } catch (error) {
              reject(error)
            }

          }, 0)
        })
        this.onRejectedCallBack.push(() => {
          setTimeout(() => {
            try {
              if (Object.prototype.toString.call(onFulfilled) !== '[object Function]') {
                reject(this.value)
              } else {
                let x = onRejected(this.value)
                promiseCallBack(x, MyPromise2, resoleve, reject)
              }
            } catch (error) {
              reject(error)
            }

          }, 0)
        })
      }
    })
    return MyPromise2;
  }
  static all(array) {
    let reasult = [];
    let cont = 0;
    return new MyPromise((resolve, reject) => {
      let addArray = (value) => {
        reasult[cont] = value;
        cont++;
        if (cont == array.length) {
          resolve(reasult)
        }
      }
      for (let i = 0, len = array.length; i < len; i++) {
        // 判断当前值是普通值还是promise对象
        if (array[i] instanceof MyPromise) {
          array[i].then((value) => addArray(value), reason => reject(reason))
        } else {
          addArray(array[i])
        }
      }
    })
  }
  static resolve(value) {
    // 判断value为promise对象还是普通值
    if (value instanceof MyPromise) {
      // 如果为promise对象
      return value
    } else {
      return new MyPromise(resoleve => resoleve(value))
    }
  }
  catch(failedCallBack) {
    // 返回失败时候的回调
    return this.then(undefined, failedCallBack)
  }

  finally(callBack) {
    return this.then(value => {
      // 根据callBack()状态返回调用时返回的value
      return MyPromise.resolve(callBack()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callBack()).then(() => { throw reason })
    })
  }
}
function promiseCallBack(x, newPromise, resoleve, reject) {
  // 判断返回值是不是当前promise对象 防止重复嵌套
  if (x === newPromise) {
    return reject(new TypeError('不能重复调用当前对象'));
  }
  // 判断返回值是不是promise对象
  if (x instanceof MyPromise) {
    // 如果为promise对象 查看promise对象返回结果 根据返回结果 调用resoleve, reject
    x.then(resoleve, reject)
  } else {
    // 如果为普通值则直接调用resolve方法
    resoleve(x)
  }

}


// module.exports = MyPromise;





let p = new MyPromise((resolve, reject) => {
  // setTimeout(()=>{
  //   reject('失败')
  // },1000)
  resolve('成功22')
  // reject('失败')
})
p.then(10).then(20).then(res => {
  console.log(res)
}, res => {
  console.log(res)
})