// Question 1: Check if all numbers are even.

const nums = [2, 4, 6, 8];
const ans = nums.every((val, index)=>{
    return val % 2 == 0;
})
console.log(ans) ; 
// Question 2: Check if all products are in stock.

const products = [
  { name: "Laptop", inStock: true },
  { name: "Mouse", inStock: true },
  { name: "Keyboard", inStock: false }
];

const inStock = products.every((product)=>{
    return product.inStock == true ; 
})

console.log(inStock) ; 

