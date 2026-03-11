# 📘 JavaScript — Execution Context, Call Stack, Hoisting, Scope & Closures

> **Topics Covered:** How JS Code Executes · Execution Context · Global Execution Context · Call Stack · Hoisting · `undefined` vs `not defined` · Scope Chain · Lexical Environment · Block Scope · Shadowing · Closures

---

## 1. ⚙️ How JavaScript Works & Execution Context

> **"Everything in JavaScript happens inside an Execution Context."**

Whenever we run a JavaScript program, the **very first thing that happens** is an **Execution Context is created**.

An Execution Context has **two components**:

```
┌──────────────────────────────────────────┐
│           EXECUTION CONTEXT              │
├─────────────────────┬────────────────────┤
│   Memory (Variable  │   Code             │
│   Environment)      │   (Thread of       │
│                     │    Execution)      │
│   key : value       │   whole code is    │
│   a  : 10           │   executed         │
│   fn : {…}          │   line by line     │
└─────────────────────┴────────────────────┘
```

- **Memory Component** → stores all variables and functions as key-value pairs
- **Code Component** → executes the code line by line (thread of execution)

### JavaScript is Single-Threaded & Synchronous
- **Single-threaded** → can execute **one command at a time**
- **Synchronous** → executes in a **specific order**
- Can only go to the **next line when the current line has finished executing**

---

## 2. 🌍 Global Execution Context (GEC)

When we **first run** the JS program, the **Global Execution Context** is created.

This Global Execution happens in **2 phases**:

### Phase 1 — Memory Creation Phase (Hoisting Phase)
All variables and functions are allocated memory **before** any code runs.
- Variables declared with `var` → stored as `undefined`
- Functions → stored as the entire function definition `{…}`

### Phase 2 — Code Execution Phase
Code is executed line by line. Values are assigned to variables.

> ⭐ Whenever a **function is invoked**, a **brand new Execution Context** is created for it inside the Code component.

### Example Walkthrough
```js
var n = 2;

function square(num) {
  var ans = num * num;
  return ans;
}

var square2 = square(n);
var square4 = square(4);
```

**Memory Creation Phase:**
```
Memory:
  n       → undefined
  square  → { ...function definition... }
  square2 → undefined
  square4 → undefined
```

**Code Execution Phase:**
```
n = 2  (assigned)

// square(n) called → NEW Execution Context created:
  Memory: num→undefined, ans→undefined
  Code:   num = 2, ans = 4, return 4
  → square2 = 4, context destroyed

// square(4) called → NEW Execution Context created:
  Memory: num→undefined, ans→undefined
  Code:   num = 4, ans = 16, return 16
  → square4 = 16, context destroyed
```

---

## 3. 📚 Call Stack

> For managing execution contexts, the JavaScript engine uses the **Call Stack**.

The Call Stack maintains the **order of execution** of execution contexts.

**Other names for Call Stack:** Program Stack · Control Stack · Runtime Stack · Machine Stack · Execution Context Stack

```
┌────────────────┐
│   square(4)    │  ← new EC pushed when function called
├────────────────┤
│   square(n)    │  ← new EC pushed when function called
├────────────────┤
│   Global EC    │  ← always at bottom (created first)
└────────────────┘
     Call Stack
```

- When a function is **called** → its EC is **pushed** onto the stack
- When a function **returns** → its EC is **popped** off the stack
- The **Global EC** is always at the bottom
- When the program finishes → Global EC is also popped → stack is **null/empty**

### How functions work in JS (with Call Stack)
```js
var x = 1;
a();
b();
console.log(x);

function a() {
  var x = 10;
  console.log(x); // finds x in LOCAL env first → 10
}

function b() {
  var x = 100;
  console.log(x); // finds x in LOCAL env first → 100
}
```

**Call Stack sequence:**
```
b() EC pushed → b() runs → b() EC popped
a() EC pushed → a() runs → a() EC popped
Global EC: x=1 → console.log(x) → 1
```

---

## 4. 🏋️ Hoisting in JavaScript

**Hoisting** is the process whereby you can access the value of a variable or function **even before it is initialized** — even before the line where it is written.

> This is because of the **Memory Creation Phase** — variables are allocated memory (set to `undefined`) BEFORE code runs.

### Example 1 — `var` hoisting
```js
// Program
getName();          // called BEFORE definition
console.log(x);    // accessed BEFORE declaration

var x = 7;

function getName() {
  console.log("Hello World");
}

// Output:
// Hello World   ← function works perfectly ✅
// undefined     ← x exists but has no value yet
```

**Why?** During Memory Creation Phase: `x → undefined`, `getName → {function}`. So calling `getName()` works. Accessing `x` gives `undefined` (placeholder).

### Example 2 — Arrow Function hoisting
```js
// Program
getName();              // ← will give ERROR
console.log(getName);   // → undefined (acts as variable)

var getName = () => {
  console.log("Hello");
};
```
> Arrow functions assigned to `var` are **NOT hoisted as functions**. They are treated as variables → get `undefined` in memory phase → calling them before assignment throws `TypeError`.

---

## 5. 🌐 Shortest JS Program & `this` at Global Level

When we run even an **empty JS file**, JS creates:
- **Global Execution Context**
- **Global Object** (`window` in browsers)
- **`this` keyword** which points to the `window` object

```
At global level → this === window  (in browsers)
```

- When we type `window` in the browser console → we get a big Window object with many functions
- JS creates the Global Execution Context + Global Object `window` automatically

---

## 6. ❓ `undefined` vs `not defined`

These are **two completely different things** in JS!

### `undefined`
- Is like a **placeholder** that is assigned to variables **even before the execution of code**
- This happens during the **Memory Creation Phase**
- Memory IS allocated → but value is not yet assigned

```js
var a;
console.log(a); // undefined ← memory allocated, no value yet
```

### `not defined`
- When we **haven't declared** the variable at all, and we try to access it
- We get a **ReferenceError: x is not defined**
- Memory is **NOT allocated** at all

```js
console.log(b); // ReferenceError: b is not defined
```

> ⚠️ `undefined` ≠ empty. It is a **special value** in JS — a variable exists but hasn't been assigned yet.

---

## 7. 🔗 Scope Chain, Scope & Lexical Environment

> **"Scope in JS is directly related to Lexical Environment"**

### Lexical Environment
Every time an **Execution Context is created**, a **Lexical Environment** is also created.

```
Lexical Environment = Local Memory + Lexical Environment of Parent
```

### Scope Chain
The scope chain is the **chain of Lexical Environments** — it goes from local → parent → grandparent → global.

```
Scope Chain = Local Memory + Lexical Env of its Parent
```

### Example — Scope Chain in action
```js
// Example 1
function a() {
  console.log(b); // Output: 10 ✅
}
var b = 10;
a();
// → Program first finds 'b' in local env of a() → not found
// → Then looks in global env → finds b = 10 → logs 10
```

```js
// Example 2 — Nested scope
function a() {
  c();
  function c() {
    console.log(b); // Output: 10 ✅
  }
}
var b = 10;
a();
// → c() looks locally → not found
// → looks in a()'s env → not found
// → looks in global env → finds b = 10
```

```js
// Example 3 — b defined inside a()
function a() {
  var b = 10;
  c();
  function c() {
    console.log(b); // Output: 10 ✅
  }
}
a();
// → c() looks locally → not found
// → looks in a()'s env → finds b = 10 ✅
```

```js
// Example 4 — b NOT accessible from outside
function a() {
  var b = 10;
  c();
  function c() {}
}
a();
console.log(b); // ❌ not defined — b is not in global scope
// Here SCOPE comes into picture
// Scope = where we can access 'b'
```

> ⭐ **Scope is directly dependent upon the Lexical Environment**

### Call Stack with Lexical Environments
```
┌─────────────────────────────────┐
│  c() → Memory: C:{}            │  → lexical env of a()
│         Code: C()              │
├─────────────────────────────────┤
│  a() → Memory: b:10, C:{…}    │  → lexical env of Global
│         Code: C()              │
├─────────────────────────────────┤
│  Global EC → Memory: a:{…}    │  → null (no parent)
│              Code: a()        │
└─────────────────────────────────┘
         Whenever an EC is created →
         a Lexical Environment is also created
```

---

## 8. 🏗️ `let` & `const` Hoisting & Temporal Dead Zone (TDZ)

**Hoisting** is the process whereby you can access a variable or function's value even before it is initialized.

### `let` and `const` ARE hoisted — but differently from `var`
- `let` and `const` declarations are hoisted **but** are stored in a **different memory space** than global
- We **cannot access** them until a value is assigned to them
- This period is called the **Temporal Dead Zone (TDZ)**

```js
console.log(b); // undefined ← var hoisting works fine

let a = 10;
var b = 100;

console.log(a); // ← Cannot access 'a' before initialization ❌
let a = 10;
var b = 100;
```

### Temporal Dead Zone (TDZ)
**TDZ** = the time **from when the `let` variable is hoisted** to the time **a value is assigned to it**.

While variables are in TDZ → **ReferenceError** is thrown if accessed.

```
Hoisting ←————————————→ Initialization
         ← TDZ Zone →
  (Cannot access 'a' here — ReferenceError)
```

### ReferenceError is thrown in two cases:

| Case | Error |
|------|-------|
| Variable is in Temporal Dead Zone | `Cannot access 'x' before initialization` |
| Variable was never declared in code | `x is not defined` |

### `const` — Cannot separate declaration and initialization
```js
// ✅ let allows this
let a;
a = 10;

// ❌ const does NOT allow this
const a;       // SyntaxError: Missing initializer in const declaration
a = 10;
```

### Re-declaration rules
```js
// ❌ Cannot re-declare let or const
let a = 10;
let a = 20; // SyntaxError

// ❌ Cannot mix var and let redeclarations
let a = 10;
var a = 100; // SyntaxError (even this)

// ✅ let with separate assignment is fine
let a;
a = 10;
```

---

## 9. 📦 Block Scope & Shadowing

### Block `{}`
A **block** is used to **group statements** together — also called a **compound statement**.

```js
{
  // this is a block
  var a = 10;   // global scoped
  let b = 20;   // block scoped
  const c = 30; // block scoped
}
```

### Block Scope
**Block scope** means what all variables and functions we can access **within the block**.

- `let` and `const` are **block scoped**
- `var` is **NOT block scoped** (it is function/global scoped)

```js
{
  var a = 10;   // accessible OUTSIDE block
  let b = 20;   // only accessible INSIDE block
  const c = 30; // only accessible INSIDE block
  console.log(a); // 10 ✅
  console.log(b); // 20 ✅
  console.log(c); // 30 ✅
}

console.log(a); // 10 ✅ (var leaks out)
console.log(b); // ❌ ReferenceError: b is not defined
console.log(c); // ❌ ReferenceError: c is not defined
```

> Inside memory: we can find `b`, `c` inside the Block, and `a` inside Global.

### Shadowing
**Variable shadowing occurs when we declare a variable with the same name in an inner scope**, overriding the outer scope variable within that inner scope.

```js
var a = 100;  // ← line ①
{
  var a = 10;   // ← line ② shadows line ①
  let b = 20;
  const c = 30;
  console.log(a); // 10 ← line ③ (shadowed value)
  console.log(b); // 20
}
console.log(a); // 10 ← line ④ (ALSO 10 — because both are in global scope!)
```

> **Why is line ④ also 10?** Both `var a` declarations are in global scope. Line ② overrides line ①. So `a` is now `10` everywhere.

### Another Shadowing Example
```js
let b = 100;  // ← inside script (block level)
{
  var a = 10;   // global
  let b = 20;   // inside block → shadows outer 'b' ONLY inside block
  const c = 30;
  console.log(a); // 10
  console.log(b); // 20 (inner b)
  console.log(c); // 30
}
console.log(b); // 100 ← outer 'b' unchanged ✅
```

### ⚠️ Illegal Shadowing
```js
let a = 20;
{
  var a = 20; // ❌ SyntaxError: Illegal Shadowing!
}
// Why? var crosses its block boundary into global scope,
// but 'a' is already declared with let in the same scope → CONFLICT
```

```js
// ✅ This is NOT illegal shadowing
let a = 20;
function hello() {
  var a = 10; // fine! scope of var 'a' is ONLY inside hello()
}
// var can shadow let inside a function because var stays inside function scope
```

### `let`/`const` follow lexical scope patterns just like normal and arrow functions
- Scope of **normal function** and **arrow function** = exactly the same

---

## 10. 🔒 Closures

> **"When functions are returned, they still maintain their lexical scope."**
> **"Not just the function — the whole CLOSURE is returned."**

A **Closure** is a function bundled together with its **lexical environment** (its surrounding scope). A closure gives access to an outer function's scope from an inner function — even **after the outer function has finished executing**.

### Key Points
- Outside a function, after it returns, the **execution context is destroyed**
- BUT when functions are **returned from** another function, they still **maintain their lexical scope**
- It's not just the function that's returned — the **entire closure** (function + its outer scope memory) is returned

### Basic Closure Example
```js
function x() {
  var a = 7;
  function y() {
    console.log(a); // "remembers" a even after x() is done
  }
  return y;
}

var z = x();
console.log(z); // → function y (the closure)
z();            // → 7 ✅ (a is still accessible via closure)
```

### Corner Case — Closure with variable mutation
```js
function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  a = 100; // a is changed AFTER y is defined
  return y;
}

var z = x();
z(); // → 100 (closure holds REFERENCE to a, not the value at time of closure)
```
> ⭐ Closures hold a **reference** to the variable, not a snapshot of the value!

---

## 🎯 Interview Questions

**Q1. What is an Execution Context in JavaScript?**
An Execution Context is the environment in which JavaScript code is evaluated and executed. It has two components: the Memory component (stores variables and functions as key-value pairs) and the Code component (executes code line by line). When JS starts, a Global EC is created, and a new EC is created for every function call.

**Q2. What is the Call Stack and what is it used for?**
The Call Stack is a mechanism the JS engine uses to keep track of the order of execution contexts. When a function is called, its EC is pushed onto the stack. When it returns, it's popped off. The Global EC is always at the bottom. It's also called Program Stack, Execution Context Stack, Runtime Stack, or Control Stack.

**Q3. What is Hoisting in JavaScript?**
Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the Memory Creation Phase. `var` variables are hoisted with value `undefined`. Function declarations are hoisted completely. `let` and `const` are hoisted but remain in the Temporal Dead Zone until initialized.

**Q4. What is the difference between `undefined` and `not defined`?**
`undefined` means the variable exists in memory (was declared) but hasn't been assigned a value yet — it's a placeholder from the Memory Creation Phase. `not defined` means the variable was never declared — no memory was allocated — accessing it throws a ReferenceError.

**Q5. What is the Temporal Dead Zone (TDZ)?**
TDZ is the time between when a `let` or `const` variable is hoisted (memory allocated in a separate space) and when it is actually initialized with a value. During this time, accessing the variable throws a ReferenceError: "Cannot access 'x' before initialization."

**Q6. What is the Scope Chain?**
The Scope Chain is the chain of Lexical Environments — when a variable is not found in the local scope, JS looks in the parent's lexical environment, then grandparent's, and so on up to the global scope. If not found anywhere, a ReferenceError is thrown.

**Q7. What is a Lexical Environment?**
A Lexical Environment = Local Memory + Lexical Environment of the Parent. It is created every time an Execution Context is created. It determines which variables are accessible where — "scope is directly dependent on the Lexical Environment."

**Q8. What is Variable Shadowing? What is Illegal Shadowing?**
Shadowing occurs when a variable in an inner scope has the same name as one in an outer scope — the inner one "shadows" the outer. Illegal shadowing occurs when `var` is used inside a block to shadow a `let` variable of the same name in the outer scope — this throws a SyntaxError because `var` escapes the block and conflicts with the `let` declaration.

**Q9. What is a Closure in JavaScript?**
A Closure is a function bundled together with its lexical environment. Even after the outer function's execution context is destroyed, the inner (returned) function still has access to the outer function's variables. The entire closure (not just the function) is returned. Closures hold a reference to variables, not their values at a point in time.

**Q10. Why does `var` declared inside a block affect the global scope?**
Because `var` is function-scoped, not block-scoped. A block `{}` does not create a new scope for `var`. So `var` declared inside `{}` (that is not a function) leaks out into the surrounding function or global scope.

---

## 💻 Code Problems — Practice These!

### Problem 1 — Predict the output (Hoisting)
```js
console.log(x);     // ?
console.log(getName); // ?
getName();           // ?

var x = 5;
function getName() {
  console.log("Rydham");
}
// Answers:
// undefined  ← var hoisted with undefined
// [Function: getName]  ← function hoisted completely
// "Rydham"   ← works fine
```

### Problem 2 — TDZ Error
```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

### Problem 3 — Closure returning counter
```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// 'count' persists via closure ✅
```

### Problem 4 — Classic Closure bug with `var` in loops
```js
// ❌ Bug: all log 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3, 3, 3 (var is shared across all iterations)

// ✅ Fix with let (block-scoped — each iteration has own i)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 0, 1, 2
```

### Problem 5 — Scope Chain
```js
var a = "global";

function outer() {
  var a = "outer";
  function inner() {
    console.log(a); // "outer" — found in outer's scope
  }
  inner();
}
outer();
```

### Problem 6 — Block Scope
```js
{
  var x = 1;
  let y = 2;
  const z = 3;
}
console.log(x); // 1 ✅ (var escapes block)
console.log(y); // ❌ ReferenceError
console.log(z); // ❌ ReferenceError
```

### Problem 7 — Closure: Function factory
```js
function multiplier(factor) {
  return function (number) {
    return number * factor; // 'factor' remembered via closure
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

### Problem 8 — Shadowing demo
```js
let x = "global";

function test() {
  let x = "local"; // shadows outer x
  console.log(x);  // "local"
}

test();
console.log(x); // "global" — outer unchanged
```

### Problem 9 — Closure corner case (reference, not value)
```js
function outer() {
  let a = 10;
  function inner() {
    console.log(a);
  }
  a = 999; // a changed AFTER inner is defined
  return inner;
}

const fn = outer();
fn(); // 999 — closure holds REFERENCE to a, not 10!
```

### Problem 10 — Memoization using Closure (Advanced)
```js
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log("From cache");
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

const square = memoize(n => n * n);
console.log(square(4));  // 16 (computed)
console.log(square(4));  // 16 (from cache)
console.log(square(5));  // 25 (computed)
```

---

*📅 Revised: March 2026 | Part of daily JS revision series*