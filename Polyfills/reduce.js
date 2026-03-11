// Polyfill for reduce()
// Implement:
// Array.prototype.myReduce
// Requirements
// Accept callback and initial value
// Maintain accumulator
// Example
// const arr = [1,2,3,4];
// const sum = arr.myReduce((acc, curr) => acc + curr, 0);
// console.log(sum);
// // 10

Array.prototype.myReduce = function(callback , initialValue){
    //lets first check if callback is of type funtion 
    if(typeof callback !== "function"){
        return TypeError("Callback type is not function") ; 
    }
    if(!Array.isArray(this)){
        return TypeError("Reduce works only on arrays") ; 
    }
    //Lets check the initial value 
    let accumulator = initialValue != undefined ? initialValue : this[0] ;
    let index = accumulator == initialValue ? 0 : 1 ; 
    for( ; index < this.length ; index++){
        accumulator = callback(accumulator , this[index]) ;
    }
    return accumulator ; 
}

const arr = [1,2,3,4];
const sum = arr.myReduce((acc, curr) => acc + curr, 0);
console.log(sum);
