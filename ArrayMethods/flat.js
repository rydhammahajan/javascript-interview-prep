// Question 1: Flatten the array one level deep.

const arr = [1, 2, [3, 4], [5, 6]];
console.log(arr.flat()) ;  // This does only one level nesting


// Question 2: Flatten the array completely.
const nums = [1, [2, [3, [4, [5]]]]];
console.log(nums.flat()) ;  // This does only one level nesting
const result = [];

function nestedLevelFlat(arr) {
    arr.forEach((item)=>{
        if(Array.isArray(item)){
            nestedLevelFlat(item) ; 
        }else{
            result.push(item) ; 
        }
    })
}
nestedLevelFlat(nums) ;
console.log(result) ; 
