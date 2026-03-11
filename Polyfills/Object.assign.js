// Polyfill for Object.assign
// Implement:
// Object.myAssign
// Requirements
// Copy properties from source objects
// Merge into target object
// Example
// const target = { a: 1 };
// const source = { b: 2 };
// Object.myAssign(target, source);
// // {a:1 , b:2}

Object.myAssign = function(target , source){
    //Validate the type of sorce 
    if(target == null){
        throw new TypeError("Target cannot be null or undefined");
    }
    if(typeof source !== "object"){
        throw new TypeError("Source must be an object");
    }

    for(let key in source){
        target[key] = source[key];
    }
    return target;
}
const target = { a: 1 };
const source = {a: 3 ,  b: 2 };
const ans  = Object.myAssign(target, source);
console.log(ans) ;
