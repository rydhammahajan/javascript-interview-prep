//Basics of what promise is -> Resolve , Reject
const resolvePromise = new Promise((resolve , reject)=>{
    const success = true ; 
    if(success) resolve("Hello") ;
    else reject("Promise Failed") ; 
}) ;
const rejectPromise = new Promise((resolve , reject)=>{
    const success = false ; 
    if(success) resolve("Hello") ;
    else reject("Promise Failed") ; 
})


resolvePromise.then((msg)=>{
    console.log(msg) ;
})
.catch((err)=>{
    console.log(err) ;
})

rejectPromise.then((msg)=>{
    console.log(msg) ;
})
.catch((err)=>{
    console.log(err) ;
})

//Fake a delay 

function fakeADelayPromise(){
    return new Promise((resolve , reject)=>{
        let flag = false ; 
        setTimeout(()=>{
            flag = true ; 
            if(flag) {
                resolve("Promise resolved") ; 
            }else{
                reject("Promise rejected") ; 
            }
        }, 1000);
        if(flag) {
            resolve("Promise resolved") ; 
        }else{
            reject("Promise rejected") ; 
        }
    })
}

fakeADelayPromise()
.then((value)=>{
    console.log(value) ; 
}).catch((err)=>{
    console.log(err) ; 
})


//Lets chain .then value 

function divide(a , b) {
    return new Promise((resolve , reject)=>{
        if(b == 0) reject("Cannot divide By Zero");
        resolve(`${a}/${b} : ${a/b}`);
    })
}
divide(10 , 5)
.then((value)=>{
    console.log(value) ;
    return value ;  
})
.then((value)=>{
    return  new Promise((resolve , reject)=>{
        resolve("Nested Promise Accepted") ; 
    })
})
.then((value)=>{
    console.log(value) ;
})
.catch((err)=>{
    console.log(err) ;
})

// Output : 
// Hello
// 10/5 : 2
// Promise Failed
// Promise rejected
// Nested Promise Accepted
