# 📘 JavaScript Basics — Revision Notes

> **Topics Covered:** Console & Variables · Data Types · Type Conversion · Arithmetic Operators · Template Literals · `var` vs `let` vs `const`

---

## 1. 🖥️ First Program — `console.log()`

`console` is an API provided by the browser for display purposes.  
`log` means **to write/print**.

```js
console.log("Hello World");
console.log(2 + 10); // 12
```

> `console.log()` accepts any message, array, or object.

---

## 2. 📦 Variables

A **variable** is a placeholder used to store some data.

```js
// Declaring a variable
var variable_name;

// Assigning a value
variable_name = 10;

// Declaring multiple variables at once
var a, b, c;
```

---

## 3. 🔢 Data Types in JavaScript

JavaScript is a **dynamically typed** (loosely typed) language.  
This means once a variable is created using `var` or `let`, we can store **any type of value** in it — and the type can change over time.

> **Statically Typed** → type of each variable is known at compile time; once declared, it can't hold another type.  
> **Dynamically Typed** → type of data assigned to a variable can change anytime. ✅ JavaScript falls here.

### To check the data type → use `typeof`

```js
var a = 10;
console.log(typeof a); // "number"
```

### Different Data Types

| Type        | Notes                                      |
|-------------|---------------------------------------------|
| `Number`    | integers, floats                            |
| `String`    | text in quotes                              |
| `Boolean`   | `true` / `false`                            |
| `Null`      | type → `object` (JS quirk)                  |
| `Undefined` | declared but no value assigned              |
| `Symbol`    | unique identifier                           |
| `BigInt`    | very large integers (use `n` suffix)        |
| `Object`    | arrays, objects, etc. → V. Imp              |

```js
var num = 123456n;
console.log(typeof num); // "bigint"

var obj = { 10: "hi", 20: "bye", 3: "..." };
let varr = [10, 20, 30];
let temp = null;
// typeof obj  → "object"
// typeof varr → "object"
// typeof temp → "object"
```

---

## 4. ❓ `undefined` — A Closer Look

```js
let variable;
console.log(variable);         // undefined
console.log(typeof variable);  // "undefined"
```

> `undefined` is a **placeholder value** assigned to a variable when no other value has been given to it.

---

## 5. 🔄 Type Conversion

In JS, most of the time **operators automatically convert** a value to the right type — this is called **Implicit Conversion (Type Coercion)**.

```js
10 / "2"   // → 5   (string "2" converted to number)
"10" * "2" // → 20  (both strings converted to numbers)
```

For **Explicit Conversion**, JS provides built-in functions:

```js
Number()
String()
Boolean()
```

### Example

```js
var a = 10;
var b = 20;
var c = String(a);   // "10"
var d = String(b);   // "20"
var e = true;        // "" → false, "0" → false, else → true
var f = Boolean(e);  // true

console.log(typeof a); // number
console.log(typeof b); // number
console.log(typeof c); // string
console.log(typeof d); // string
console.log(typeof f); // boolean
```

### ⚠️ Falsy Values in JavaScript
Any value like `0`, `""`, `undefined`, `null` → **false values (falsy)**

---

## 6. ➕ Arithmetic Operators

| Operator | Name           | Symbol |
|----------|----------------|--------|
| `+`      | Addition       | `+`    |
| `-`      | Subtraction    | `-`    |
| `*`      | Multiplication | `*`    |
| `/`      | Division       | `/`    |
| `++`     | Increment      | `++`   |
| `--`     | Decrement      | `--`   |
| `+/-`    | Unary          | `+/-`  |
| `**`     | Exponent       | `**`   |

### 🔑 Important Points

```js
var a = 5;
var b = "5";

console.log(a + b);  // "55" → string concatenation ❌ (not 10)
console.log(a - b);  // 0    → numeric subtraction ✅
```

### String + Number behavior

```js
5 + "Hello"  // → "5Hello"  (string)
5 - "Hello"  // → NaN       (Not a Number)
5 * "Hello"  // → NaN
```

---

## 7. 🔗 Concatenation & Template Literals

### Concatenation → uses `+`

```js
let name = "Rydham";
console.log("My name is " + name); // "My name is Rydham"
```

> ⚠️ For a new line in concatenation, you need `\n`

### Template Literal → uses backtick `` ` `` and `${ }`

```js
let name = "Rydham";
console.log(`My name is ${name}`); // "My name is Rydham"
```

> ✅ With Template Literals, pressing **Enter** gives a new line automatically — no need for `\n`.

---

## 8. 🆚 `var` vs `let` vs `const`

### `var`
| Property       | Behavior                                                   |
|----------------|------------------------------------------------------------|
| Scope          | **Functional** scope                                       |
| Re-declaration | ✅ Allowed → `var a = 10; var a = 20;`                     |
| Updation       | ✅ Allowed → `var a = 10; a = 20;`                         |
| Without init   | ✅ Can be declared without initialization                  |
| Hoisting       | ✅ Hoisted — declaration moved to top, value = `undefined` |

### `let`
| Property       | Behavior                                                              |
|----------------|-----------------------------------------------------------------------|
| Scope          | **Block** scope                                                       |
| Re-declaration | ❌ Not allowed → `let a = 10; let a = 20;` → Error                   |
| Updation       | ✅ Allowed → `let a = 10; a = 20;`                                    |
| Without init   | ✅ Can be declared without initialization → `let text; text = "JS is the best!";` |
| Hoisting       | ✅ Hoisted BUT placed in **Temporal Dead Zone (TDZ)** — accessing before declaration → Reference Error |

### `const`
| Property       | Behavior                                                   |
|----------------|------------------------------------------------------------|
| Scope          | **Block** scope                                            |
| Re-declaration | ❌ Not allowed                                              |
| Updation       | ❌ Not allowed — **value cannot be changed** after assignment |
| Without init   | ❌ Must be initialized at declaration → `const a = 10;` ✅  |
| Hoisting       | ✅ Hoisted BUT in **Temporal Dead Zone (TDZ)**              |

```js
// let example
let text;
text = "JS is the best!"; // ✅ works

// const example
const al = 10; // ✅
al = 20;       // ❌ TypeError: Assignment to constant variable
```

> 💡 **Temporal Dead Zone (TDZ):** `let` and `const` declarations DO take place in hoisting, but we can't access them before their declaration. The phase between hoisting and the actual declaration line is called the **Temporal Dead Zone**.

---

## 🎯 Quick Interview Questions

**Q1. What is the difference between `null` and `undefined`?**  
`undefined` means a variable has been declared but not yet assigned a value. `null` is an intentional assignment of "no value". `typeof null` returns `"object"` — this is a known JS bug.

**Q2. What is type coercion in JavaScript?**  
Type coercion is the automatic conversion of values from one type to another. For example, `"5" - 2` gives `3` because JS converts the string to a number implicitly.

**Q3. Why does `typeof null` return `"object"`?**  
This is a historical bug in JavaScript from its very first version. `null` is a primitive, but `typeof null === "object"` was never fixed to maintain backward compatibility.

**Q4. What is the Temporal Dead Zone (TDZ)?**  
The TDZ is the period between entering a block scope and the point where a `let` or `const` variable is actually declared. Accessing the variable during this phase throws a `ReferenceError`.

**Q5. What is `NaN` and when does it appear?**  
`NaN` stands for "Not a Number". It appears when a mathematical operation is performed on non-numeric values, like `5 - "Hello"`. Notably, `typeof NaN === "number"`.

**Q6. What is the difference between implicit and explicit type conversion?**  
Implicit conversion (coercion) is done automatically by JS (e.g., `"5" * 2 → 10`). Explicit conversion is done manually using functions like `Number()`, `String()`, or `Boolean()`.

**Q7. Can you re-declare a `let` variable?**  
No. Re-declaring a `let` variable in the same scope throws a `SyntaxError`. `var` allows re-declaration.

**Q8. What are falsy values in JavaScript?**  
The falsy values are: `0`, `""` (empty string), `null`, `undefined`, `NaN`, and `false`. Everything else is truthy.

---

*📅 Revised: March 2026 | Part of daily JS revision series*