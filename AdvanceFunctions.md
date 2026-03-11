# 📘 JavaScript — Functions: Basic to Advanced & Closures

> **Topics Covered:** Pure Functions · Impure Functions · First-Class Functions · Higher-Order Functions · `map()` · `filter()` · `reduce()` · Rest Parameters · Arguments Object · Default Parameters

---

## 1. 🧼 Pure Functions

Pure functions are a **fundamental concept in programming**. They are important because they ensure **predictability and reliability** in your code.

### Characteristics of a Pure Function

**1. Takes Input** — It should accept parameters and use those inputs to produce a result.

**2. Returns a Value** — It always returns a value.

**3. No Side Effects** — The output of the function should **NOT depend on any external state or variables** outside of its scope.

**4. Deterministic** — Given the same input, a pure function will **always return the same output**.

```js
// ✅ PURE FUNCTION
function add(a, b) {
  return a + b;
}
add(2, 3); // always 5 → same input, same output, no side effects
```

---

## 2. ⚠️ Impure Functions (and how to fix them)

### Example 1 — Depends on External Variable (Impure)
```js
const multiplier = 4;

function doubleValue(number) {
  return number * multiplier; // ❌ depends on external variable
}
console.log(doubleValue(5)); // 20 — but what if multiplier changes?
```
> This is **impure** because its value depends on an external variable `multiplier`.

---

### Example 2 — Mutates the Original Array (Impure)
```js
function appendNumbers(arr) {
  arr.push(5, 6);  // ❌ mutates the original array
  return arr;
}

const numbers = [1, 2, 3, 4];
const result = appendNumbers(numbers);
console.log(result);  // [1, 2, 3, 4, 5, 6]
console.log(numbers); // [1, 2, 3, 4, 5, 6] ← original changed! BAD
```

### ✅ Fix — Make it Pure using Spread
```js
function appendNumbers(arr) {
  const new_arr = [...arr, 5, 6]; // creates a new array, doesn't touch original
  return new_arr;
}

const numbers = [1, 2, 3, 4];
const result = appendNumbers(numbers);
console.log(result);  // [1, 2, 3, 4, 5, 6]
console.log(numbers); // [1, 2, 3, 4] ← original unchanged ✅
```

### Pure vs Impure — Quick Reference

| | Pure | Impure |
|---|---|---|
| Same input → same output | ✅ Always | ❌ Not guaranteed |
| Modifies external state | ❌ Never | ✅ May |
| Mutates arguments | ❌ Never | ✅ May |
| Side effects | ❌ None | ✅ May have |
| Examples | `Math.max()`, `add(a,b)` | `arr.push()`, `Math.random()` |

---

## 3. 🥇 First-Class Functions ❤️ of JavaScript

In JavaScript, functions are treated as **"First-Class Citizens"** — meaning functions can be:

1. **Assigned to a variable**
2. **Passed as arguments** to other functions
3. **Returned from** other functions

### I) Assigned to a Variable
```js
const greetMessage = function () {
  console.log("Hello World");
};

greetMessage(); // "Hello World"
```

### II) Passed as an Argument to Another Function
```js
function wrapperFunction() {
  return "Welcome to world";
}

function greetMessage(wrapper, name) {
  const message = wrapper();
  console.log(`${name}, ${message}`);
}

greetMessage(wrapperFunction, "Rydham");
// "Rydham, Welcome to world"
```

### III) Returned from a Function
```js
function displayMessage() {
  return function () {             // returning a function
    console.log("Hello from inner function!");
  };
}

const output = displayMessage();  // output holds the returned function
output();                         // "Hello from inner function!"
```

---

## 4. 🏗️ Higher-Order Functions (HOF)

A **Higher-Order Function** is a function that does **at least one** of the following:
- **Takes one or more functions as arguments**
- **Returns a function as a result**

> `map`, `filter`, and `reduce` are all **Higher-Order Functions** ✅

### HOF — Taking a Function as Argument
```js
function wrapper() {
  return "Welcome to GFG";
}

function greetMessage(wrapper, name) {
  console.log(`${name}, ${wrapper()}`);
}

greetMessage(wrapper, "Rydham"); // "Rydham, Welcome to GFG"
```

### HOF — Returning a Function
```js
function displayMessage() {
  return function () {
    console.log("Hello from inner function!");
  };
}

const output = displayMessage();
output(); // "Hello from inner function!"
```

---

## 5. 🗺️ `map()` Method — Higher-Order Function

`map()` applies a given function on **all elements of the array** and returns a **new updated array** of the same length.

```js
// Syntax
array.map(function(args) {
  // code
});

// Arrow function shorthand
array.map((args) => {
  // code
});
```

### Example
```js
const arr = [1, 2, 3, 4, 5, 6];

const squareArray = arr.map((n) => {
  return n ** 2;
});

console.log(squareArray); // [1, 4, 9, 16, 25, 36]
```

---

## 6. 🔍 `filter()` Method — Higher-Order Function

`filter()` filters out the elements of the array that return **false** for the applied condition, and returns a new array containing only the elements that **satisfy the condition**.

```js
const arr = [1, 2, 3, 4, 5, 6];

const newArr = arr.filter((number) => {
  return number % 2 == 0;
});

console.log(newArr); // [2, 4, 6]
```

---

## 7. ➕ `reduce()` Method — Higher-Order Function

`reduce()` traverses the entire array and **returns a single value** using an accumulator.

```js
const arr = [1, 2, 3, 4, 5];

const output = arr.reduce((acc, cur) => {
  return acc + cur;
}, 0); // 0 is the initial value of accumulator

console.log(output); // 15
```

> 💡 The second argument to `reduce()` is the **initial value** of the accumulator (`acc`).

### map / filter / reduce — Quick Syntax Reference

```js
arr.map((ele) => { /* code logic */ });

arr.filter((item) => { /* code logic */ });

arr.reduce((acc, cur) => { /* code logic */ }, initialValue);
```

---

## 8. 🔢 Rest Parameters (`...`)

Rest parameters are very similar to the **arguments object**, but they are an actual **array**.

Rest parameters collect all **remaining arguments** into a single array. They should always be used as the **last parameter** of the function.

```js
function calculateTotal(a, b, ...rest) {
  console.log(a);    // first arg
  console.log(b);    // second arg
  console.log(rest); // all remaining args as array
}

calculateTotal(2, 3, 4, 5, 6, 7, 8, 9, 11, 16);
// Output:
// 2
// 3
// [4, 5, 6, 7, 8, 9, 11, 16]
```

> ⭐ Rest parameters collect all **remaining** arguments and form an **array** containing all of them.  
> ⚠️ Must always be the **last parameter**.

---

## 9. 📦 Arguments Object

The **arguments object** is available inside all **regular functions** (NOT arrow functions). It is an **array-like object** (not a true array) that contains all arguments passed to the function.

```js
function calculateTotal(a, b) {
  console.log(arguments.length); // total number of args passed
  console.log(arguments[0]);     // first argument
  console.log(arguments);        // all arguments
}

const total = calculateTotal(3, 4, 5, 6);
// Output:
// 4  (length — 4 args passed even though only 2 params defined)
// 3  (first arg)
// { '0': 3, '1': 4, '2': 5, '3': 6 } ← array-LIKE object, not real array

calculateTotal(3, 4, 5, 6, 7, 8);
// Output: 6, 3, { '0':3, '1':4, '2':5, '3':6, '4':7, '5':8 }
```

> ✅ In JS, passing **more arguments than parameters** does NOT give an error.  
> The extra args are accessible via `arguments` object.

### Convert `arguments` to a real array
```js
function calculateTotal(a, b) {
  const arr = [...arguments]; // spread to real array
  console.log(arr); // [3, 4, 5, 6]
}
calculateTotal(3, 4, 5, 6);
```

### arguments Object vs Rest Parameters

| | `arguments` object | Rest Parameters `...` |
|---|---|---|
| Type | Array-like object | Real array |
| Works in arrow functions | ❌ No | ✅ Yes |
| Array methods available | ❌ No (must convert) | ✅ Yes directly |
| Collects all args | ✅ Yes | ✅ Only remaining |

---

## 10. 🎛️ Default Parameters (ES6)

Default parameters allow you to set **fallback values** for function parameters in case no argument (or `undefined`) is passed.

```js
function greet(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

greet();                    // "Hello, Guest!"
greet("Rydham");            // "Hello, Rydham!"
greet("Rydham", "Welcome"); // "Welcome, Rydham!"
```

> ⚠️ Default parameters should always come **after** required parameters.

---

## 🎯 Interview Questions

**Q1. What is a Pure Function? Give an example of converting an impure function to pure.**
A pure function always returns the same output for the same input and has no side effects. For example, `arr.push()` mutates the original — to make it pure, return a new array using `[...arr, newItem]` instead.

**Q2. What are First-Class Functions in JavaScript?**
Functions that can be assigned to variables, passed as arguments, and returned from other functions. This is what enables patterns like callbacks, higher-order functions, and closures in JS.

**Q3. What is a Higher-Order Function? Name 3 built-in HOFs.**
A HOF takes one or more functions as arguments OR returns a function. The 3 most common built-in HOFs are `map()`, `filter()`, and `reduce()`.

**Q4. What is the difference between `map()` and `filter()`?**
`map()` transforms each element and always returns an array of the **same length**. `filter()` returns a **new array with only elements** that pass the condition — so the length may be shorter.

**Q5. What does `reduce()` do? What is the second argument?**
`reduce()` reduces an array to a single value using an accumulator. The second argument is the **initial value of the accumulator**. Without it, the first element becomes the initial value.

**Q6. What is the difference between Rest Parameters and the Arguments Object?**
`arguments` is an array-like object available in regular functions that contains all passed arguments. Rest parameters (`...rest`) are a real array containing only the remaining parameters after named ones. Rest works in arrow functions; `arguments` does not.

**Q7. Can you pass more arguments than parameters in JS?**
Yes. JS does not throw an error. Extra arguments are accessible via the `arguments` object (in regular functions) or can be captured using rest parameters.

**Q8. What is function composition and how do HOFs enable it?**
Function composition is the process of combining two or more functions where the output of one becomes the input of the next. HOFs enable this by accepting and returning functions.

```js
const double = x => x * 2;
const addTen = x => x + 10;
const compose = (f, g) => x => f(g(x));
const doubleThenAdd = compose(addTen, double);
console.log(doubleThenAdd(5)); // 20
```

---

## 💻 Code Problems — Practice These!

### Problem 1 — Pure Function: Add without mutating
```js
// Impure
function addItem(arr, item) {
  arr.push(item); // mutates!
  return arr;
}

// Pure ✅
function addItemPure(arr, item) {
  return [...arr, item];
}

const original = [1, 2, 3];
const newArr = addItemPure(original, 4);
console.log(original); // [1, 2, 3] ← unchanged
console.log(newArr);   // [1, 2, 3, 4]
```

### Problem 2 — `map()`: Square all numbers
```js
const arr = [1, 2, 3, 4, 5, 6];
const squares = arr.map(n => n ** 2);
console.log(squares); // [1, 4, 9, 16, 25, 36]
```

### Problem 3 — `filter()`: Get all even numbers
```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = arr.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8]
```

### Problem 4 — `reduce()`: Sum of array
```js
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15
```

### Problem 5 — Chaining map + filter + reduce
```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Sum of squares of all even numbers
const result = arr
  .filter(n => n % 2 === 0)       // [2, 4, 6, 8, 10]
  .map(n => n ** 2)               // [4, 16, 36, 64, 100]
  .reduce((acc, n) => acc + n, 0);// 220

console.log(result); // 220
```

### Problem 6 — HOF: Custom `map` from scratch
```js
function myMap(arr, fn) {
  const result = [];
  for (let item of arr) {
    result.push(fn(item));
  }
  return result;
}

console.log(myMap([1, 2, 3], x => x * 3)); // [3, 6, 9]
```

### Problem 7 — Rest Parameters: Sum of all args
```js
function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sumAll(1, 2, 3, 4, 5));        // 15
console.log(sumAll(10, 20, 30, 40, 50));   // 150
```

### Problem 8 — Arguments Object: Find max
```js
function findMax() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) max = arguments[i];
  }
  return max;
}
console.log(findMax(3, 7, 1, 9, 4)); // 9
```

### Problem 9 — Default Parameters: Greeting
```js
function greet(name = "Guest", role = "User") {
  return `Welcome, ${name}! You are logged in as ${role}.`;
}
console.log(greet());                   // "Welcome, Guest! You are logged in as User."
console.log(greet("Rydham", "Admin"));  // "Welcome, Rydham! You are logged in as Admin."
```

### Problem 10 — Function Returning Function (Closure preview)
```js
function multiplier(factor) {
  return function (number) {
    return number * factor; // 'factor' is remembered via closure
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

---

*📅 Revised: March 2026 | Part of daily JS revision series*