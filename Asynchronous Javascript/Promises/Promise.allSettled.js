/**
 * Promise.allSettled() => as the word settled implies , it waits for all the promises to get settled/finished(resolved or rejected)
 * then gives the consolidated result of all the promises. 
 * Always resolves with [{status:'fulfilled',value}, {status:'rejected',reason}] Never rejects — you get every outcome no matter what
 * 
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
const promise4 = promiseFunction(300 , false) ;  

Promise.allSettled([promise1 , promise2 , promise3])
.then((value)=>{
    console.log(value) ;
}).catch((err)=>{
    console.log(err) ;
}) ; 

Promise.allSettled([promise1 , promise2 , promise4])
.then((value)=>{
    console.log(value) ;
}).catch((err)=>{
    console.log(err) ;
}) ; 

// Output : 
// [
//   { status: 'fulfilled', value: 'Promise resolved' },
//   { status: 'fulfilled', value: 'Promise resolved' },
//   { status: 'rejected', reason: 'Promise reject' }
// ]
// [
//   { status: 'fulfilled', value: 'Promise resolved' },
//   { status: 'fulfilled', value: 'Promise resolved' },
//   { status: 'fulfilled', value: 'Promise resolved' }
// ]
