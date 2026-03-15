// A function that can only be called one time. No matter how many times you call it after that — it does nothing (or returns the first result).

function onceWrapper(fn){
    let onceFlag = false ; 
    let lastResult ; 
    return function(...args){ 
        if(!onceFlag) {
            onceFlag = true ; 
            return lastResult = fn.apply(this , args);
        }
        return lastResult ;
    }

}


function multiply(a , b) {
    console.log(a + " " + b + " "  + a*b) ;
    return a*b ; 
}

const onceCaller = onceWrapper(multiply) ; 
console.log(onceCaller(10 , 49)) ; 
console.log(onceCaller(10 , 4)) ;
