// Polyfill for map()
// Implement:
// Array.prototype.myMap
// Requirements
// Should return a new array
// Should execute callback for every element
// Example
// const arr = [1,2,3];
// const result = arr.myMap(num => num * 2);
// console.log(result);
// [2,4,6]


Array.prototype.myMap = function(callback){
    //here the this keyword will represent the array object itself 
    console.log("Actual array : " , this) ; 
    const ans = [] ; 
    for(let index = 0 ; index < this.length ; index++){
        ans.push(callback(this[index]));
    }
    return ans ;
}

const arr = [1,2,3];
const result = arr.myMap(num => num * 2);
console.log(result);
