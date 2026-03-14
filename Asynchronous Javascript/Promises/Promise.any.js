/**
 * Promise.any() => Very similar to Promise.race(). Promise.any() doesnt take the rejected result in the consideration *unless all the promises get rejected
 * First to RESOLVE wins (ignores rejections) Only rejects if ALL reject → AggregateError
 */
function promiseFunction(timer , verdict = true){
    return  new Promise((resolve , reject)=>{
        setTimeout(()=>{
            if(verdict){
                resolve("Promise resolved") ; 
            }else{
                reject("Promise reject") ; 
            }
        }, timer) ;
    })
}

//Lets now create 3 promises
const promise1 = promiseFunction(100) ; 
const promise2 = promiseFunction(300) ; 
const promise3 = promiseFunction(500) ;


Promise.any([promise1 , promise2 , promise3])
.then((value)=>{
    console.log(value) ;
}).catch((err)=>{
    console.log(err) ;
}) ; 

const promise4 = promiseFunction(300 , false) ;  
const promise5 = promiseFunction(300 , false) ;  

Promise.any([promise4 , promise5])
.then((value)=>{
    console.log(value) ;
    value.forEach((val) => {
        console.log(val) ; 
    })
}).catch((err)=>{
    console.log(err) ;
}) ; 


// Output :
// Promise resolved
// [AggregateError: All promises were rejected] {
//   [errors]: [ 'Promise reject', 'Promise reject' ]
// }
