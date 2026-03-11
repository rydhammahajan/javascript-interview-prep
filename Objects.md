# 📘 JavaScript — Objects, `this` Keyword & Function Borrowing

> **Topics Covered:** Object Basics · Nested Objects · Object Methods · `this` Keyword · `call()` · `apply()` · `bind()` · Object Destructuring · Optional Chaining · `for...in` · Computed Properties · Shorthand Properties · Object Reference & Deep Copy

---

## 1. 📦 Objects in JavaScript

An **Object** is a non-primitive data type that stores data as **key-value pairs**.

```js
// Basic object
const user = {
  name: "Prakash",
  age: 99,
  city: "Mumbai"
};

// Access properties
console.log(user.name);    // "Prakash"
console.log(user["city"]); // "Mumbai"
```

### Nested Object
```js
let obj = {
  name: "Prakash",
  address: {
    state: "MH",
    city: "Mumbai",
    locality: "Santacruz"
  },
  courses: ["html", "css", "js", "nextjs", "redux"]
};

console.log(obj.address.city); // "Mumbai"
console.log(obj.courses[2]);   // "js"
```

---

## 2. 🛠️ Object Methods

### `Object.entries(obj)`
Returns an **array of arrays** — each inner array is a `[key, value]` pair.

```js
const obj = { name: "Prakash", age: 99, city: "Mumbai" };

const entries = Object.entries(obj);
// Output: [["name","Prakash"], ["age",99], ["city","Mumbai"]]
```

### `Object.keys(obj)`
Returns an array of all **keys**.

```js
const keys = Object.keys(obj);
// ["name", "age", "city"]
```

### `Object.values(obj)`
Returns an array of all **values**.

```js
const values = Object.values(obj);
// ["Prakash", 99, "Mumbai"]
```

### `Object.assign(target, source)`
Used to perform a **shallow copy** of an object.

```js
const person1 = { name: "Rydham", age: 23 };
const person2 = Object.assign({}, person1); // {} is target, person1 is source

person2.name = "Muskaan";
console.log(person1.name); // "Rydham" ← unchanged (shallow copy of flat object)
```

> ⚠️ `Object.assign` does **shallow copy only**. For nested objects, use JSON method or spread.

---

## 3. 🔁 `for...in` Loop

Used to **check if a property exists** in an object, and also to **iterate** through object properties.

```js
const obj = { name: "Rydham", city: "Gurdaspur" };

// Check if property exists
const isFound = "age" in obj;
console.log(isFound); // false

// Iterate through object
for (let key in obj) {
  console.log(key, obj[key]);
}
// name Rydham
// city Gurdaspur
```

---

## 4. 🔗 Object Reference and Shallow/Deep Copy

### Shallow Copy (Copy by Reference)
Objects are **copied by reference** in JS. Both variables point to the same memory location.

```js
const person1 = { name: "Rydham", age: 23 };
const person2 = person1; // same reference!

person2.name = "Muskaan";
console.log(person1); // { name: "Muskaan", age: 23 } ← also changed!
console.log(person2); // { name: "Muskaan", age: 23 }
// Why? Because objects are copied by reference.
```

### Deep Copy Methods

**Method 1 — Spread Operator** ✅ (works for flat/non-nested objects)
```js
const obj2 = { ...obj1 };
```

**Method 2 — `Object.assign()`** ✅ (works for flat objects only)
```js
const person2 = Object.assign({}, person1);
```

**Method 3 — JSON method** ✅ (works for nested objects too)
```js
obj2 = JSON.parse(JSON.stringify(obj1));
```

> ⚠️ For **nested level objects**, spread and `Object.assign` do **shallow copy only**. Use `JSON.parse(JSON.stringify())` for a true deep copy of nested objects.

---

## 5. ➕ Computed Properties

Used to **add a property dynamically** to an existing object, or use a variable as a key.

```js
// Adding property to existing object
const obj = { name: "Prakash", age: 100 };
obj.city = "Mumbai";
obj.state = "MH";
console.log(obj);

// Using variable as key (Computed Property)
const input = "score";
const obj2 = {
  [input]: "This was input value"
};
// { score: "This was input value" }
```

---

## 6. ✍️ Object Shorthand Property

When the **key name and variable name are the same**, you can use shorthand.

```js
// Old way
function getObject(name, city) {
  return {
    name: name,
    city: city
  };
}

// Shorthand (ES6) ✅
function getObject(name, city) {
  return { name, city }; // key == value name → write once
}
```

---

## 7. 🔓 Object Destructuring (ES6)

Allows **unpacking** of object properties into variables.

```js
const obj = {
  name: "Prakash",
  address: {
    state: "MH",
    city: "Mumbai",
    locality: "Santacruz"
  },
  courses: ["html", "css", "js"]
};

// Basic destructuring
let { name, address, courses } = obj;
console.log(name);    // "Prakash"
console.log(address); // { state: "MH", city: "Mumbai", locality: "Santacruz" }
```

### Renaming Variable While Destructuring
```js
// What if I need to rename the property to another variable?
let { name: username } = obj;
console.log(username); // "Prakash"
```

### Destructuring Nested Object
```js
let { address: { city } } = obj;
console.log(city); // "Mumbai"
// Note: "address" is now destructured, you can't use obj.address directly anymore
```

---

## 8. 🔗 Optional Chaining (`?.`)

Used to **safely access nested properties and methods** without throwing an error if an intermediate value is `null` or `undefined`.

```js
const user = {
  name: "Prakash",
  age: 99,
  address: {
    street: "Kalina",
    city: "Mumbai"
  },
  likes: "Eat Sleep Repeat"
};

// Accessing nested property normally
console.log(user.address.city); // "Mumbai"

// Accessing property that doesn't exist
console.log(user.hobbies); // undefined (no error)

// Problem: If address is commented out/missing:
// console.log(user.address.city) → ❌ TypeError!

// Solution 1 — if/else
if (user.address !== undefined) {
  console.log(user.address.city);
} else {
  console.log("Address not found");
}

// Solution 2 — Optional Chaining ✅ (cleaner)
console.log(user?.address?.city);
// Checks: does user exist? → does user.address exist? → then access .city
// If any part is undefined → returns undefined (no crash)
```

> 💡 Optional chaining also works with **variables** and **functions**: `user?.greet?.()`

---

## 9. 🔑 `this` Keyword

The `this` keyword in JavaScript refers to the **object that is executing the function**. Its value depends on **how** the function is called.

```js
// Example 1 — function is a property of an object
const obj = {
  name: "Rydham",
  displayMessage: function () {
    console.log(this.name); // "Rydham"
  }
};
obj.displayMessage();
// Here, obj is calling displayMessage, so 'this' refers to obj
```

### `this` in Regular Function (standalone)
```js
function showThis() {
  console.log(this);
}
showThis(); // logs the global object (Window in browser)
```

### `this` with Arrow Function inside Object
```js
const obj = {
  name: "Rydham",
  displayMessage: () => {
    console.log(this.name); // undefined ❌
  }
};
obj.displayMessage();
// Arrow functions do NOT have their own 'this'
// They inherit from enclosing (outer) scope — which is global here
// Arrow function's this = Enclosing scope's this (NOT obj)
```

### `this` with Arrow Function inside Regular Method ✅
```js
const person = {
  name: "Rydham",
  greet: function () {
    const arrow = () => {
      console.log(this.name); // "Rydham" ✅
    };
    arrow();
  }
};
person.greet();
// Arrow function inside greet inherits 'this' from greet
// 'this' of arrow = 'this' of outer greet = person object
```

### `this` in Nested Regular Functions ❌
```js
const obj = {
  name: "Rydham",
  showName: function (xxx) {
    function display() {
      console.log(this.name); // undefined ❌
    }
    display();
  }
};
obj.showName();
// display() is a regular function called normally (not as obj method)
// So 'this' is not bound to obj — it logs undefined (or Window in non-strict)
```

### `this` in Constructor Function
```js
function User(name, age) {
  this.name = name; // 'this' refers to the newly created object
  this.age = age;
}
const user = new User("Rydham", 100);
console.log(user.name); // "Rydham"
```

### Summary Table

| Context | `this` refers to |
|---------|-----------------|
| Regular function (standalone) | Global object (`window`) |
| Method inside an object | The object calling the method |
| Arrow function | Enclosing scope's `this` |
| Arrow inside regular method | Outer method's `this` (object) |
| Constructor function (`new`) | Newly created object |
| `call()` / `apply()` / `bind()` | Whatever you pass as first argument |

---

## 10. 🏗️ Constructor Function & `new` Keyword

Constructor functions are essentially regular functions, but with two key differences:
- Named with a **capital letter**
- Can only be executed using the **`new` keyword**

**When to use?** → When you need to create **many objects with the same properties** (e.g., 50 user objects).

```js
function User() {}

const user1 = User;       // user1 is just the function itself
const user2 = new User(); // user2 is a NEW object { }

console.log(user1); // [Function: User]
console.log(user2); // User {} ← object
```

### With Properties
```js
function User(name, age) {
  // Properties are added to the newly created object using 'this'
  this.name = name;
  this.age = age;
}

const user = new User("Rydham", 100);
console.log(user.name); // "Rydham"

// The 'this' keyword inside a constructor refers to the newly created object
```

---

## 11. 📞 Function Borrowing — `call()`, `apply()`, `bind()`

**Function Borrowing** allows one object to **borrow methods from another object** without making a copy of that method. This avoids code repetition and makes code more modular and maintainable.

### Concept
```js
// Define sayHi once — let multiple objects use it
function sayHi() {
  console.log(this); // 'this' value depends on how it's called
}

const user1 = { name: "Prakash", displayName: sayHi };
const user2 = { name: "Prakash", showName: function() { displayName(); } };

// Example 1 — function as property of object
// user1.displayName() → logs user1 object (this = user1)

// Example 2 — function called normally inside another
// user2.showName() → logs Window (this = global, not user2)
```

---

### `call()` — Borrow & Invoke Immediately

`call()` lets you invoke a function with a specified `this` value and **individual arguments**.

```js
const user1 = { name: "Rydham", age: 23 };
const user2 = { name: "Muskaan", age: 25 };
const user3 = { name: "Prakash", age: 30 };

function sayHi() {
  console.log(this.name);
}

sayHi.call(user1); // "Rydham"
sayHi.call(user2); // "Muskaan"
sayHi.call(user3); // "Prakash"
```

### With Arguments
```js
function introduce(degree, year) {
  console.log(`${this.name}, Degree: ${degree}, Year: ${year}`);
}

introduce.call(user1, "BTech", 2025);
// "Rydham, Degree: BTech, Year: 2025"
```

---

### `apply()` — Borrow & Invoke with Array of Arguments

`apply()` works exactly like `call()` but takes arguments as an **array** instead of individual values.

```js
introduce.apply(user2, ["BTech", 2019]);
// "Muskaan, Degree: BTech, Year: 2019"
```

| | `call()` | `apply()` |
|---|---|---|
| Invokes immediately | ✅ | ✅ |
| Arguments | Individual: `fn.call(obj, a, b)` | Array: `fn.apply(obj, [a, b])` |

---

### `bind()` — Borrow & Return New Function (Call Later)

Unlike `call` and `apply`, **`bind` does NOT immediately invoke the function**. Instead, it **returns a new function** with `this` permanently set to the provided value. That new function can be invoked later.

```js
const boundSayHiUser1 = sayHi.bind(user1);
// Returns a new function with 'this' bounded to user1

boundSayHiUser1(); // "Rydham" — call it whenever you want!
```

### With Arguments
```js
const boundIntroduce = introduce.bind(user1, "BTech", 2025);
boundIntroduce(); // "Rydham, Degree: BTech, Year: 2025"
```

### Where to use `bind`?
> Use `bind` when you don't want to call the function immediately — e.g., in event listeners, callbacks, or any async context where you need to preserve `this`.

```js
// e.g., event listener scenario
button.addEventListener("click", sayHi.bind(user1));
```

### Summary Table

| Method | Invokes Immediately | Arguments | Returns |
|--------|-------------------|-----------|---------|
| `call(obj, a, b)` | ✅ Yes | Individual | Result of function |
| `apply(obj, [a, b])` | ✅ Yes | Array | Result of function |
| `bind(obj, a, b)` | ❌ No | Individual (pre-set) | New function |

---

## 🎯 Interview Questions

**Q1. What is `this` in JavaScript?**
`this` refers to the object currently executing the function. Its value is determined at call time — it depends on *how* the function is called, not *where* it is defined (except for arrow functions, which use lexical `this`).

**Q2. What is the difference between `call()`, `apply()`, and `bind()`?**
All three let you set `this` explicitly. `call()` invokes the function immediately with arguments passed individually. `apply()` also invokes immediately but takes arguments as an array. `bind()` does NOT invoke — it returns a new function with `this` permanently bound, to be called later.

**Q3. What does `this` refer to inside an arrow function?**
Arrow functions do NOT have their own `this`. They inherit `this` from their **lexical (enclosing) scope** — whatever `this` was in the surrounding context at the time the arrow function was defined.

**Q4. What is Function Borrowing?**
Function Borrowing is the technique of using `call()`, `apply()`, or `bind()` to allow one object to use a method defined on another object, without copying the method. This avoids duplication and promotes DRY code.

**Q5. What is Optional Chaining (`?.`)?**
Optional chaining safely accesses deeply nested properties. If any property in the chain is `null` or `undefined`, it short-circuits and returns `undefined` instead of throwing a TypeError. Example: `user?.address?.city`.

**Q6. What is the difference between `Object.assign()` and the spread operator for copying?**
Both create a **shallow copy** of a flat object. For nested objects, neither does a true deep copy — nested objects are still copied by reference. Use `JSON.parse(JSON.stringify(obj))` for deep copying nested objects.

**Q7. What is a Constructor Function?**
A constructor function is a regular function named with a capital letter that is executed with the `new` keyword. When called with `new`, JS creates a new empty object, sets `this` to it, and returns it. It is used to create multiple objects sharing the same structure.

**Q8. What is `Object.entries()` and when would you use it?**
`Object.entries()` returns an array of `[key, value]` pairs. It is useful when you want to iterate over both keys and values together, or when you want to convert an object into an array for further processing like `.map()` or `.filter()`.

**Q9. What is Object Destructuring and how do you rename a property?**
Object destructuring extracts properties into variables. To rename: `let { name: username } = obj` — this creates a variable `username` with the value of `obj.name`.

**Q10. What happens to `this` inside a regular function nested inside an object method?**
A regular (non-arrow) nested function loses the object's `this`. It reverts to the global object (or `undefined` in strict mode). Use an arrow function instead to inherit `this` from the outer method.

---

## 💻 Code Problems — Practice These!

### Problem 1 — Function Borrowing with `call()`
```js
const person1 = { name: "Rydham", age: 23 };
const person2 = { name: "Muskaan", age: 25 };

function greet(greeting) {
  console.log(`${greeting}, I am ${this.name} and I am ${this.age}`);
}

greet.call(person1, "Hello");  // "Hello, I am Rydham and I am 23"
greet.call(person2, "Hi");     // "Hi, I am Muskaan and I am 25"
```

### Problem 2 — `apply()` with Math functions
```js
const numbers = [5, 1, 9, 3, 7];
const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);
console.log(max); // 9
console.log(min); // 1
// Modern alternative: Math.max(...numbers)
```

### Problem 3 — `bind()` for delayed execution
```js
const user = { name: "Rydham" };

function sayName() {
  console.log(this.name);
}

const boundFn = sayName.bind(user);
setTimeout(boundFn, 2000); // logs "Rydham" after 2 seconds
```

### Problem 4 — Constructor Function to create multiple objects
```js
function Employee(id, name, occupation) {
  this.id = id;
  this.name = name;
  this.occupation = occupation;
}

const em1 = new Employee(1, "Prakash", "Backend Dev");
const em2 = new Employee(2, "Abhish Jangra", "Data Scientist");
const em3 = new Employee(3, "Sakshi", "Sr. Executive");

console.log(em1.name); // "Prakash"
console.log(em2.occupation); // "Data Scientist"
```

### Problem 5 — Object Destructuring with rename + nested
```js
const obj = {
  name: "Prakash",
  address: {
    state: "MH",
    city: "Mumbai"
  }
};

// Rename 'name' to 'username', destructure nested 'city'
const { name: username, address: { city } } = obj;
console.log(username); // "Prakash"
console.log(city);     // "Mumbai"
```

### Problem 6 — Optional Chaining safety
```js
const users = [
  { name: "Rydham", address: { city: "Mumbai" } },
  { name: "Muskaan" } // no address
];

users.forEach(user => {
  console.log(user?.address?.city ?? "City not available");
});
// "Mumbai"
// "City not available"
```

### Problem 7 — Deep Copy with JSON method
```js
const original = {
  name: "Rydham",
  address: { city: "Mumbai", state: "MH" }
};

const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Delhi";

console.log(original.address.city); // "Mumbai" ← unchanged ✅
console.log(deepCopy.address.city); // "Delhi"
```

### Problem 8 — `Object.entries()` to transform object
```js
const prices = { apple: 100, banana: 50, mango: 120 };

const discounted = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, price * 0.9])
);
console.log(discounted);
// { apple: 90, banana: 45, mango: 108 }
```

### Problem 9 — Polyfill for `bind()` (Advanced)
```js
// Implementing bind manually — common interview question!
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.call(context, ...args, ...newArgs);
  };
};

function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const boundGreet = greet.myBind({ name: "Rydham" }, "Hello");
boundGreet(); // "Hello, Rydham"
```

### Problem 10 — `for...in` to find key + value
```js
const student = { name: "Rydham", marks: 95, grade: "A" };

for (let key in student) {
  console.log(`${key} → ${student[key]}`);
}
// name → Rydham
// marks → 95
// grade → A
```

---

*📅 Revised: March 2026 | Part of daily JS revision series*
