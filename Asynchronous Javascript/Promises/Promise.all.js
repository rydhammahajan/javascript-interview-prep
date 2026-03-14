//Promise.all() 
//What it does — takes an array of Promises, runs them all in parallel, waits for every one to finish.
//Rule 1 — All resolve → get array of results -> Results come back in the same order as input — 
// not the order they finished. promise1 result is always index 0, even if promise3 finished first.
//Rule 2 — Any one rejects → whole thing rejects immediately.
//Lets first create a promise 

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
const promise4 = promiseFunction(300 , false) ;  

Promise.all([promise1 , promise2 , promise3])
.then((value)=>{
    console.log(value) ;
}).catch((err)=>{
    console.log(err) ;
}) ; 

Promise.all([promise1 , promise2 , promise4])
.then((value)=>{
    console.log(value) ;
    value.forEach((val) => {
        console.log(val) ; 
    })
}).catch((err)=>{
    console.log(err) ;
}) ; 
