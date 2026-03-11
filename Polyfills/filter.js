// Polyfill for filter()
// Implement:
// Array.prototype.myFilter
// Requirements
// Should return a new array
// Include elements that pass the condition
// Example
// const arr = [1,2,3,4,5];
// const result = arr.myFilter(num => num % 2 === 0);
// console.log(result);
// // [2,4]

Array.prototype.myFilter = function(callback){

    const ans = [] ; 
    this.forEach((item)=>{
        if(callback(item)) {
            ans.push(item) ; 
        }
    })
    return ans ; 
}


const arr = [1,2,3,4,5];
const result = arr.myFilter(num => num % 2 === 0);
console.log(result);
