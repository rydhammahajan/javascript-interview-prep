// You are given an array of numbers.
// Use forEach() to create a new array containing the square of each number.
const nums = [1, 2, 3, 4, 5];
const ans = [] ; 
nums.forEach((value , index)=>{
    nums[index] = value*2 ; // This method is used to make changes in the same array
    ans.push(value*2) ; //This method creates a new array 
})
console.log(nums);
console.log(ans) ;  


// You are given an array of user objects.
// Use forEach() to print the following format:
// Name: Rydham, Age: 24
// Name: Aditi, Age: 22
// Name: Rahul, Age: 30

const users = [
  { name: "Rydham", age: 24 },
  { name: "Aditi", age: 22 },
  { name: "Rahul", age: 30 }
];

users.forEach((user)=>{
    console.log(`Name: ${user.name}, Age: ${user.age}`) ; 
})
