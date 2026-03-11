// Question 1: Sort numbers in ascending order.

const nums = [45, 12, 89, 3, 27];
nums.sort() //This will sort by taking the numbers as strings 
//To sort as numbers, we need to pass the comparator function 
nums.sort((a, b)=>{
    return a-b ;
})
console.log(nums) ; 


// Question 2: Sort users by age (ascending).

const users = [
  { name: "Riya", age: 28 },
  { name: "Arjun", age: 21 },
  { name: "Kabir", age: 25 }
];

users.sort() ; // This wont do anything 
users.sort((a , b)=>{
    return a.age - b.age ; 
})
console.log(users) ; 

