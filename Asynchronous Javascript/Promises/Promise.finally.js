/**
 * Runs always — whether resolved or rejected. No value is passed in (it does not receive the result). Use it for cleanup work that must happen regardless: hiding a loading spinner, closing a connection, logging.
 */

const dummyPromise1 = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        resolve("Promise resolved") ; 
    }, 1000) ; 
})

const dummyPromise2 = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        reject("Promise rejected") ; 
    }, 1000) ; 
})

dummyPromise1
.then((val)=>{
    console.log(val) ; 
})
.catch((val)=>{
    console.log(val)
})
.finally(()=>{
    console.log("Inside Promise.finally()") ; 
})

dummyPromise2
.then((val)=>{
    console.log(val) ; 
})
.catch((val)=>{
    console.log(val)
})
.finally(()=>{
    console.log("Inside Promise.finally()") ; 
})

// Output: 
// Promise resolved
// Inside Promise.finally()
// Promise rejected
// Inside Promise.finally()

