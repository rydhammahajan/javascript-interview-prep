/**
 * Promise.race() => As the word race implies -> First one to finish WINS — whether it resolves or rejects. The rest are *ignored. Classic use case: set a timeout race against a real request. Whichever settles first determines the outcome.
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
const promise4 = promiseFunction(1000 , false) ;  

Promise.race([promise1 , promise2 , promise3])
.then((value)=>{
    console.log("Inside first call : ") ; 
    console.log(value) ;
}).catch((err)=>{
    console.log("Inside first call : ") ; 
    console.log(err) ;
}) ; 

Promise.race([promise1 , promise2 , promise4])
.then((value)=>{
    console.log("Inside second call : ") ; 
    console.log(value) ;
}).catch((err)=>{
    console.log("Inside second call : ") ; 
    console.log(err) ;
}) ; 

// Output :
// Inside first call :
// Promise resolved
// Inside second call :
// Inside second call :
// Promise resolved

// =>Irrespective of promise accepted / rejected => it will return the result of the very first promise which gets settled  