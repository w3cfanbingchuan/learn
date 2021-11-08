let promise = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve(100)
  },1000)
  
  // reject('is error')
})
promise.then(function(res){
  console.log('success',res)
},function(err){
  console.log('error:',err)
})
console.log(111111) 