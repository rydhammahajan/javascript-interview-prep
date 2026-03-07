# 📘 JavaScript — Arrays Revision Notes

> **Topics Covered:** Array Basics · Declaration · Iteration · Array Methods · Spread & Rest Operator · Destructuring · Copy by Reference · Interview Q&A · Code Problems

---

## 1. 📦 What is an Array?

An **Array** is a **non-primitive data type** used to store multiple values in a single variable. In JavaScript, arrays can hold a **mix of data types**.

```js
// Different ways to declare an array
var house = [];                        // a) empty array
var house = [10, 20, 30, 40];          // b) with values
var house = new Array();               // c) using Array constructor
var house = new Array(10, 20, 30);     // d) constructor with values
var house = new Array(10);             // e) creates array of size 10
```

> 💡 In JavaScript, we can have a mix of data types in the same array:
```js
let mixed = [1, "hello", true, null, { name: "Rydham" }];
```

---

## 2. 🔁 Iterating an Array

### 1) `for` loop
```js
let arr = [10, 20, 30, 40, 50];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

### 2) `while` loop
```js
let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
```

### 3) `forEach`
Traverses the entire array. Does **not** return a new array. Used for side effects only.
```js
arr.forEach((item) => {
  console.log(item);
});
```

### 4) `every`
Traverses the entire array and returns `true` only if **all** elements satisfy the condition.
```js
let ans = arr.every((item) => {
  return item > 10;
});

if (ans == false) console.log("Less than 10 present");
else console.log("> 10 only");
```

### 5) `map`
Traverses the array, performs a transformation, and returns a **new array**.
```js
let arr = [10, 20, 30, 40, 50];
let newArr = arr.map((item) => {
  item = item * 2;
  return item;
});
console.log(newArr); // [20, 40, 60, 80, 100]
```

### 6) `filter`
Traverses the entire array and returns a new array with items that pass the condition.
```js
let newArr = arr.filter((item) => {
  return item % 2 == 0;
});
```

### 7) `reduce`
Traverses the entire array and returns a **single value**.
```js
let ans = arr.reduce((acc, item) => {
  return acc + item;
}, 0); // 0 is the initial value of accumulator
```

### 8) `some`
Returns `true` if **at least one** element satisfies the condition.
```js
let hasEven = arr.some((item) => item % 2 === 0);
```

---

## 3. 🛠️ Array Methods

### I) `push()`
Inserts one or multiple values at the **end** of the array.
```js
arr.push(10);
arr.push(10, 20, 30, 40);
```

### II) `pop()`
Removes and returns the **last** element.
```js
let last = arr.pop();
```

### III) `unshift()`
Same as `push` but adds new element at the **front**.
```js
arr.unshift(5); // adds 5 at the beginning
```

### IV) `shift()`
Removes and returns element from the **front**.
```js
let first = arr.shift();
```

### V) `slice(begin, end)`
Returns a **new array** from `begin` to `end - 1`. Does **NOT** mutate the original.
```js
let arr = [10, 20, 30, 40, 50];
console.log(arr.slice(1, 3)); // [20, 30]
console.log(arr.slice(2));    // [30, 40, 50]
```

### VI) `concat()`
Merges two or more arrays into a new array.
```js
arr1.concat(arr2);
arr1.concat(arr2, arr3);
```

### VII) `split()` *(String → Array)*
Splits a string into an array based on a separator.
```js
"hello world".split(" "); // ["hello", "world"]
```

### VIII) `join()`
Converts an **array to a string**.
```js
let arr = ["hello", "world"];
console.log(arr.join(" ")); // "hello world"
console.log(arr.join("-")); // "hello-world"
```

### IX) `includes()`
Similar to string `includes()`. Returns `true`/`false`.
```js
arr.includes(ele, start); // start is optional
```

### X) `sort()`
Sorts the array **in place** (mutates original). Default sort converts to string and compares character by character.

```js
const fruits = ["apple", "cherry", "orange", "banana"];
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry", "orange"]
```

> ⚠️ Default `sort()` with numbers gives wrong results:
```js
const numbers = [1, 4, 2, 6, 7, 3, 9, 8, 5, 61, 31, 51, 11];
numbers.sort();
// ❌ Output: 1, 11, 2, 3, 31, 4, 5, 51, 6, 61, 7, 9
// Reason: sort converts numbers to strings first!
```

> ✅ For numeric sort, use a **callback function**:
```js
// Ascending
numbers.sort(function sortInAscending(a, b) {
  return a - b; // if a is smaller, it stays before b
});

// Descending
numbers.sort((a, b) => b - a);
```

### ⭐ `splice()` vs `slice()`

| | `slice()` | `splice()` |
|---|---|---|
| Mutates original array | ❌ No | ✅ Yes |
| Purpose | Extract | Insert / Remove / Replace |

```js
// splice(start, deleteCount, ...itemsToAdd)
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);         // removes 1 element at index 2 → [1, 2, 4, 5]
arr.splice(1, 0, 99);     // inserts 99 at index 1 → [1, 99, 2, 4, 5]
arr.splice(0, 2, 10, 20); // replaces 2 elements from index 0
```

---

## 4. 🌊 Spread Operator (`...`)

The **spread operator** basically **spreads** (expands) the array into individual elements.

```js
const arr = [1, 2, 3, 4, 5];
console.log(...arr); // 1 2 3 4 5
```

### Spread for Deep Copy
```js
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [...arr1, 1, 2, 3];       // [1, 2, 3, 4, 5, 1, 2, 3]
let arr3 = [...arr1, 1, 2, 3];       // [1, 2, 3, 4, 5, 1, 2, 3]
```

### Spread with Arrays
```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

### Spread with Objects
```js
const obj1 = { a: 1, b: 2 };
const copyObj = { ...obj1 };         // shallow copy of object
console.log(copyObj);                // { a: 1, b: 2 }
```

---

## 5. 🗑️ Rest Operator (`...`)

The **rest operator** collects multiple elements into a **single array or object**. Same syntax as spread — context determines which it is.

| | Rest `...` | Spread `...` |
|---|---|---|
| Used to | **Collect** multiple elements into single array/object | **Spread** out elements of an array/object |

### Rest in Functions
```js
function sum(...numbers) {
  console.log(numbers); // [1, 2, 3, 4, 5]
}
console.log(sum(1, 2, 3, 4, 5));
```

### Rest with Arrays
```js
const fruits = ["apple", "banana", "mango", "orange"];
const [first, second, ...others] = fruits;
console.log(others); // ["mango", "orange"]
```

### Rest with Objects
```js
const user = { id: 1, name: "Rydham", age: 29 };
const { id, ...rest } = user;
console.log(rest); // { name: "Rydham", age: 29 }
```

---

## 6. 📦 Copy by Reference

In JavaScript, objects and arrays are stored by **reference**, not by value.

### Shallow Copy
When an address is copied, changes in one are **reflected in the other**.

```js
let arr1 = [10, 20, 30, 40];
let arr2 = arr1; // address gets copied → shallow copy

arr2[0] = 50;

console.log(arr1); // [50, 20, 30, 40] ← also changed!
console.log(arr2); // [50, 20, 30, 40]
```

### Deep Copy
Change in one is **NOT reflected** in the other. Two ways:

**1) Iterate and push values one by one:**
```js
let arr1 = [10, 20, 30, 40];
let arr2 = [];
for (let val of arr1) {
  arr2.push(val);
}
arr2[0] = 99;
console.log(arr1); // [10, 20, 30, 40] ← unchanged
console.log(arr2); // [99, 20, 30, 40]
```

**2) Spread Operator (preferred):**
```js
let arr1 = [10, 20, 30, 40];
let arr2 = [...arr1]; // deep copy
arr2[0] = 99;
console.log(arr1); // [10, 20, 30, 40] ← unchanged
```

---

## 7. 🔓 Array Destructuring (ES6)

Destructuring allows **unpacking of array elements** into variables.

```js
// Old way
let arr = [10, 20, 30];
var1 = arr[0]; // 10
var2 = arr[1]; // 20
var3 = arr[2]; // 30

// With Destructuring ✅
let [var1, var2, var3] = [10, 20, 30];
```

### Skip Elements
```js
let [first, , third] = [10, 20, 30];
console.log(first); // 10
console.log(third); // 30
```

### With Rest
```js
let [var1, var2, ...var3] = [10, 20, 30, 40, 50];
console.log(var3); // [30, 40, 50]
```

### Object Destructuring
```js
// Old way
var marks = { x: 21, y: 22, z: 3 };
var x = marks.x;
var y = marks.y;

// With Destructuring (ES6) ✅
var { x, y, z } = marks;

// With spread
var { x, ...rest } = { ...marks };
```

---

## 🎯 Interview Questions

**Q1. What is the difference between `map()`, `filter()`, and `reduce()`?**
- `map()` — transforms each element, returns a new array of same length.
- `filter()` — returns a new array with only elements that pass a condition.
- `reduce()` — reduces the entire array to a single value using an accumulator.

```js
let arr = [1, 2, 3, 4, 5];
arr.map(x => x * 2);           // [2, 4, 6, 8, 10]
arr.filter(x => x % 2 === 0);  // [2, 4]
arr.reduce((acc, x) => acc + x, 0); // 15
```

**Q2. What is the difference between `slice()` and `splice()`?**
`slice()` extracts a portion of an array and returns it as a new array without mutating the original. `splice()` mutates the original array and can insert, remove, or replace elements.

**Q3. What is shallow copy vs deep copy?**
A shallow copy copies the reference (memory address), so changes to one affect the other. A deep copy creates a completely independent copy. Use the spread operator or `JSON.parse(JSON.stringify())` for deep copies.

**Q4. What is the difference between `forEach()` and `map()`?**
`forEach()` just iterates — it returns `undefined` and is used for side effects. `map()` transforms each element and always returns a new array of the same length.

**Q5. Why does `sort()` give wrong results for numbers?**
Because `sort()` converts elements to strings before comparing them. `"61"` comes before `"7"` alphabetically. Always pass a comparator `(a, b) => a - b` for numeric sorting.

**Q6. What is the difference between `rest` and `spread` operator?**
Both use `...` syntax. Spread expands an iterable into individual elements. Rest collects individual elements into an array. Spread is used in function calls or array/object literals; Rest is used in function parameters or destructuring.

**Q7. What is array destructuring?**
It's an ES6 feature that allows unpacking values from arrays into variables in a single line. `let [a, b, c] = [1, 2, 3]` is equivalent to assigning `arr[0]`, `arr[1]`, `arr[2]` individually.

**Q8. What does `every()` return vs `some()`?**
`every()` returns `true` only if **all** elements satisfy the condition. `some()` returns `true` if **at least one** element satisfies it.

---

## 💻 Code Problems — Practice These!

### Problem 1 — Sum of All Elements (using `reduce`)
```js
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, item) => acc + item, 0);
console.log(sum); // 15
```

### Problem 2 — Find All Even Numbers (using `filter`)
```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = arr.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8]
```

### Problem 3 — Double All Values (using `map`)
```js
const arr = [10, 20, 30];
const doubled = arr.map(n => n * 2);
console.log(doubled); // [20, 40, 60]
```

### Problem 4 — Remove Duplicates from Array
```js
const arr = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4, 5]
```

### Problem 5 — Flatten a Nested Array
```js
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity)); // fully flatten
```

### Problem 6 — Find Max and Min without Math
```js
const arr = [3, 7, 1, 9, 4];
const max = arr.reduce((a, b) => (a > b ? a : b));
const min = arr.reduce((a, b) => (a < b ? a : b));
console.log(max); // 9
console.log(min); // 1
```

### Problem 7 — Count Occurrences of Each Element
```js
const arr = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = arr.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }
```

### Problem 8 — Sort Numbers Correctly
```js
const numbers = [1, 4, 2, 61, 31, 51, 11, 9];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 4, 9, 11, 31, 51, 61]
```

### Problem 9 — Swap Two Variables using Destructuring
```js
let a = 5, b = 10;
[a, b] = [b, a];
console.log(a, b); // 10 5
```

### Problem 10 — Deep Copy using Spread
```js
let original = [1, 2, 3, 4, 5];
let copy = [...original];
copy[0] = 99;
console.log(original); // [1, 2, 3, 4, 5] ← unchanged
console.log(copy);     // [99, 2, 3, 4, 5]
```

---

*📅 Revised: March 2026 | Part of daily JS revision series*