/**
 *
async alone
→ I am a Promise producer
→ caller must .then() or await me

async + await together
→ I am a Promise consumer internally
→ await unwraps Promises into plain values
→ I write logic like normal synchronous code
→ my return value gets auto-wrapped as a Promise
→ so I am ALSO a producer for whoever calls me

With .then()/.catch() you handle errors with .catch(). With async/await you use try/catch — the same way you handle synchronous errors. If the awaited Promise rejects, the catch block catches it.
 */

//Lets first create a promise 
const promise = new Promise((resolve , reject)=>{
    // resolve("Promise resolved") ; 
    reject("Promise rejected") ; 
})

//Now lets use async function 
async function promiseConsumer(){
    return promise
    .then((val)=>{
        console.log(val) ; 
    }).catch((err)=>{
        console.log(err) ; 
    })
}

//Now lets use async - await 
async function promiseConsumer2(){
    try{
        const data = await(promise) ; 
        console.log(data) ; 
    }catch(err){
        console.log(err) ;
    }
}


promiseConsumer() ; 
promiseConsumer2() ; 

//Lets try sequential and parallel execution with async - await 

const promise1 = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        resolve("Promise1 resolved") ; 
    }, 100)
})

const promise2 = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        resolve("Promise2 resolved") ; 
    }, 300)
})

const promise3 = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        resolve("Promise3 resolved") ;
    }, 500) 
})

//Sequentional usage 

async function sequential(){
    console.log("Before all awaits") ; 
    const first = await(promise1) ; 
    const second = await(promise2) ; 
    const third = await(promise3) ; 
    console.log("After all await") ;
}
sequential() ; //Observe the console screen , how much time it takes to print both console statements 

async function parallel(){
    console.log("Before all awaits") ; 
    const result = await Promise.all([promise1 , promise2 , promise3]) ;  
    console.log("After all await") ;
}




// ## Sequential — what happens on the timeline
// ```
// 0ms     → "Before all awaits" prints
// 0ms     → await promise1 — function pauses, waits...
// 100ms   → promise1 resolves → first = "Promise resolved"
// 100ms   → await promise2 — function pauses again, waits...
// 400ms   → promise2 resolves (100 + 300) → second = "Promise resolved"
// 900ms   → promise3 resolves (100 + 300 + 500) → third = "Promise resolved"
// 900ms   → "After all awaits" prints

// Total time → 900ms  (100 + 300 + 500 — times ADD UP)
// ```

// **Why?** Because each `await` pauses the function and waits for that Promise to fully finish before even starting the next one. They run one after another — like standing in a queue.
// ```
// promise1  |===100ms===|
// promise2               |===300ms===|
// promise3                            |===500ms===|
//                                                ↑
//                                             900ms
// ```

// ---

// ## Parallel — what happens on the timeline
// ```
// 0ms     → "Before all awaits" prints
// 0ms     → Promise.all starts ALL THREE at the same time
// 0ms     → function pauses at await, waiting for ALL to finish
// 100ms   → promise1 resolves internally
// 300ms   → promise2 resolves internally
// 500ms   → promise3 resolves — ALL done → result = [val1, val2, val3]
// 500ms   → "After all awaits" prints

// Total time → 500ms  (only the SLOWEST one)
// ```

// **Why?** Because `Promise.all` fires all three simultaneously before any `await` happens. They all run at the same time — like three workers working in parallel.
// ```
// promise1  |===100ms===|
// promise2  |=======300ms=======|
// promise3  |===========500ms===========|
//                                ↑
//                              500ms
// ```

// ---

// ## Side by side
// ```
// Sequential   →  100 + 300 + 500 = 900ms
// Parallel     →  max(100, 300, 500) = 500ms
// ```

// ---

// ## The one rule to lock in
// ```
// sequential await  →  each promise WAITS for the previous to finish
//                   →  use when step 2 NEEDS the result of step 1

// parallel await    →  all promises start at the SAME time
//                   →  use when promises are INDEPENDENT of each other