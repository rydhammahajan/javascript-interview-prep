function memoize(fn) {
    // your code here
    const cache = {}

    return function(...args){

        const key = JSON.stringify(args) ; 
        if(key in cache) {
            return cache[key] ; 
        }else{
            return cache[key] = fn.apply(this , args) ;
        }
    }
}

// Test with this
function add(a, b) {
    console.log("Computing add:", a, b);
    return a + b;
}

const memoAdd = memoize(add);

console.log(memoAdd(2, 3));    // should compute   → 5
console.log(memoAdd(2, 3));    // should use cache → 5
console.log(memoAdd(5, 5));    // should compute   → 10
console.log(memoAdd(5, 5));    // should use cache → 10
console.log(memoAdd(2, 3));    // should use cache → 5
