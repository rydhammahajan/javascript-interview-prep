# 📘 JavaScript — Functions & Strings Revision Notes

> **Topics Covered:** Function Declaration · Anonymous Functions · Arrow Functions · First-Class Functions · Strings & String Methods

---

## 1. ⚙️ Functional Programming

> **"Functions are the heart of JavaScript"**

In JS, we don't need to mention any return type with a function, and we also don't need to mention the data type of parameters.

### Function Syntax

```js
function functionName(p1, p2, p3, ...) {
  // function body
}
```

---

## 2. 📋 Function Declaration vs Function Statement vs Function Definition

These three terms refer to the **same thing** — the standard way of defining a function using the `function` keyword.

```js
function greet(name) {
  console.log("Hello, " + name);
}
```

### 🔑 Hoisting with Function Declarations
Function declarations are **fully hoisted** — you can call them **even before** they appear in the code.

```js
sayHello(); // ✅ Works! — Hoisting

function sayHello() {
  console.log("Hello!");
}
```

---

## 3. 🕵️ Anonymous Function & Function Expression

An **Anonymous Function** is a function that does **not have any name** associated with it.

If we need to access an anonymous function, we can do so via:

### a) Immediately Invoked Function Expression (IIFE)

```js
(function () {
  console.log("This is an anonymous function!");
})();
```

> The function runs **immediately** after it's defined. No name needed.

### b) Function Expression — Assigning a function to a variable

```js
let variable = function () {
  // body
};

variable(); // call it using the variable name
```

> ⚠️ Function expressions are **NOT hoisted** like function declarations. You cannot call them before the line they are defined on.

```js
greet(); // ❌ TypeError: greet is not a function

var greet = function () {
  console.log("Hi!");
};
```

---

## 4. 🏹 Arrow Functions

Arrow functions (introduced in **ES6**) are a **more concise** way to write functions in JavaScript. They come with some significant differences compared to regular functions.

### Basic Syntax

```js
// Regular function
function add(x, y) {
  return x + y;
}

// Arrow function
let add = (x, y) => {
  return x + y;
};
```

### Simplified — Single Expression (Implicit Return)

When the function body has only a **single expression to return**, you can drop the `{}` and `return` keyword:

```js
let calculateSum = (x, y) => x + y; // implicitly returns x + y
```

### Even Simpler — Single Parameter

```js
let square = x => x * x; // no parentheses needed for single param
```

---

## 5. 🌍 Arrow Functions & Lexical `this`

One of the **most significant differences** between arrow functions and normal functions is how they handle the **`this` keyword**.

| | Regular Function | Arrow Function |
|---|---|---|
| `this` binding | Own `this` context (depends on how called) | Inherits `this` from surrounding scope |
| Use in methods | ✅ Great | ❌ Avoid |
| Use in callbacks | Can cause `this` issues | ✅ Great |

```js
// Problem with regular function
function Timer() {
  this.seconds = 0;
  setInterval(function () {
    this.seconds++; // ❌ 'this' is NOT the Timer object here
    console.log(this.seconds);
  }, 1000);
}

// Fixed with arrow function
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++; // ✅ 'this' is inherited from Timer
    console.log(this.seconds);
  }, 1000);
}
```

> **Arrow functions do not have their own `this` context. They inherit `this` from the surrounding non-arrow function or the global context.**

---

## 6. 🥇 First-Class Functions (First-Class Citizens)

In JavaScript, functions are called **First-Class Citizens** because of their power to:

| Ability | Example |
|--------|---------|
| **a) Get assigned to a variable** | `let fn = function() {}` |
| **b) Get passed as an argument** | `doSomething(fn)` |
| **c) Get returned from a function** | `return function() {}` |

```js
// a) Assigned to variable
let greet = function(name) {
  return "Hello " + name;
};

// b) Passed as argument (Callback)
function runFunction(fn) {
  fn();
}
runFunction(() => console.log("I was passed as argument!"));

// c) Returned from a function (Higher-Order Function)
function multiplier(factor) {
  return (num) => num * factor;
}
let double = multiplier(2);
console.log(double(5)); // 10
```

---


## 🎯 Interview Questions

**Q1. What is the difference between function declaration and function expression?**  
A function declaration is hoisted — you can call it before its definition. A function expression is assigned to a variable and is NOT hoisted; calling it before the line of definition throws a TypeError.

**Q2. What is an IIFE and why is it used?**  
IIFE (Immediately Invoked Function Expression) is a function that runs immediately after being defined. It is used to create a private scope, avoid polluting the global namespace, and execute initialization code.

```js
(function () {
  let privateVar = "I am private";
  console.log(privateVar);
})();
// privateVar is not accessible outside
```

**Q3. What is the difference between arrow functions and regular functions?**  
The key differences are: (1) Arrow functions have no own `this` — they inherit from lexical scope. (2) Arrow functions cannot be used as constructors. (3) Arrow functions have no `arguments` object. (4) Arrow functions provide shorter syntax.

**Q4. What are First-Class Functions?**  
Functions in JS are first-class citizens — they can be assigned to variables, passed as arguments to other functions, and returned from functions. This enables patterns like callbacks and higher-order functions.

### Problem  — Arrow Function: Find Max of Two Numbers
```js
const findMax = (a, b) => (a > b ? a : b);
console.log(findMax(10, 20)); // 20
```

### Problem  — Higher-Order Function: Filter Even Numbers
```js
function filterNumbers(arr, conditionFn) {
  return arr.filter(conditionFn);
}
let evens = filterNumbers([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
console.log(evens); // [2, 4, 6]
```

### Problem — IIFE to Create a Counter
```js
const counter = (function () {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
})();

counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount()); // 2
```

---

*📅 Revised: March 2026 | Part of daily JS revision series*