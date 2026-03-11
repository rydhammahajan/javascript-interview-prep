// Question 1: Check if any number in the array is negative.

const nums = [5, 10, -3, 8, 2];
const ans = nums.some((num)=>{
    return num < 0 ; 
})
console.log(ans) ;

// Question 2: Check if any user is below 18 years old.
const users = [
  { name: "Riya", age: 21 },
  { name: "Arjun", age: 17 },
  { name: "Kabir", age: 25 }
];
const userBelow18 = users.some((user)=>{
    return user.age < 18 ; 
})
console.log(userBelow18) ; 
