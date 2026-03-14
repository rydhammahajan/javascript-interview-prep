# 📘 JavaScript — Promises Interview Prep

> **Topics Covered:** What is a Promise · States · Creating Promises · resolve & reject · .then .catch .finally · Chaining · Promise methods · Common mistakes · 15 Interview Q&A · Code problems

---

## 1. What is a Promise

A Promise is a **JS object** that represents a value which will arrive in the future. It is the actual mechanism JS uses to handle async work.

Before Promises, async work was handled with **nested callbacks** — deeply indented, hard to read, impossible to maintain. This was called **Callback Hell**.

```js
// Callback Hell ❌
getUser(id, function(user) {
    getPosts(user, function(posts) {
        getComments(posts, function(comments) {
            // deeper and deeper — pyramid of doom
        });
    });
});

// Promise chain ✅
getUser(id)
    .then(user     => getPosts(user))
    .then(posts    => getComments(posts))
    .then(comments => console.log(comments))
    .catch(err     => console.log(err));
```

---

## 2. Three States of a Promise

A Promise always exists in exactly one of these three states:

| State | Meaning | Can change? |
|---|---|---|
| `pending` | initial state — waiting for result | yes |
| `fulfilled` | operation succeeded — has a value | no — locked forever |
| `rejected` | operation failed — has a reason | no — locked forever |

```
pending  →  fulfilled   (via resolve)
pending  →  rejected    (via reject)
```

Once a Promise moves from `pending` to either `fulfilled` or `rejected` — it is **settled**. Its state can never change again. Calling `resolve` or `reject` after settling does nothing.

```js
new Promise((resolve, reject) => {
    resolve('first');    // ✅ settles here
    reject('second');    // ❌ ignored — already settled
    resolve('third');    // ❌ ignored — already settled
});
```

---

## 3. Creating a Promise

```js
const myPromise = new Promise((resolve, reject) => {
    // executor function — runs immediately and synchronously
    // do your async work here
    // call resolve(value) on success
    // call reject(reason) on failure
});
```

### Where do `resolve` and `reject` come from?

You do not create them. **JS creates them internally and passes them to you as parameters.**

```js
new Promise((resolve, reject) => {
    //        ↑              ↑
    //   JS made this    JS made this
    //   handed to you   handed to you
});
```

They are just plain functions. You can rename them to anything — `resolve`/`reject` is just convention everyone follows.

```js
new Promise((yes, no) => {
    yes('worked');   // same as resolve()
});
```

### What they do internally (simplified)

```js
function resolve(value) {
    if (state !== 'pending') return;  // only works once
    state = 'fulfilled';
    // triggers all .then() callbacks
}

function reject(reason) {
    if (state !== 'pending') return;  // only works once
    state = 'rejected';
    // triggers all .catch() callbacks
}
```

### Always use `return` before reject to stop execution

```js
// ❌ bug — resolve runs even when b is 0
function divide(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) reject('Cannot divide by zero');
        resolve(a / b);   // still runs!
    });
}

// ✅ correct — return stops execution after reject
function divide(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) return reject('Cannot divide by zero');
        resolve(a / b);
    });
}
```

---

## 4. The Executor runs synchronously

The function inside `new Promise(...)` runs **immediately and synchronously**. Wrapping code in a Promise does NOT make it async.

```js
console.log('1 — before');

new Promise((resolve, reject) => {
    console.log('2 — inside executor');   // runs RIGHT NOW
    resolve('done');
    console.log('3 — still inside');      // also runs immediately
});

console.log('4 — after');

// Output: 1 → 2 → 3 → 4   (not async — executor is synchronous)
```

**What IS async** — the `.then()` and `.catch()` callbacks. They always go to the Microtask Queue, even if the Promise was already resolved.

```js
console.log('1');

Promise.resolve('hi').then(val => {
    console.log('3', val);   // Microtask Queue — runs after sync code
});

console.log('2');

// Output: 1 → 2 → 3 hi
```

> Promise does not make code async. `setTimeout`, `fetch`, file reads — those are async. Promise is just the container that gives you a clean way to handle when they finish.

---

## 5. Consuming a Promise — `.then()` `.catch()` `.finally()`

```js
myPromise
    .then(value  => { /* runs if resolved */ })
    .catch(error => { /* runs if rejected */ })
    .finally(()  => { /* always runs — no value passed */ });
```

### `.then(onFulfilled, onRejected)`

`.then()` takes two optional arguments. Usually you only pass the first and use `.catch()` separately.

```js
promise
    .then(
        value => console.log('Success:', value),   // on fulfilled
        error => console.log('Error:', error)      // on rejected (optional)
    );
```

### `.catch(onRejected)`

Shorthand for `.then(null, onRejected)`. Catches any rejection in the entire chain above it.

```js
promise
    .then(val => doSomething(val))
    .then(val => doMore(val))
    .catch(err => console.log(err));   // catches errors from ANY .then() above
```

### `.finally(onFinally)`

Always runs — success or failure. Receives NO value. Used for cleanup.

```js
showLoadingSpinner();

fetchData()
    .then(data  => renderPage(data))
    .catch(err  => showError(err))
    .finally(() => hideLoadingSpinner());   // always hides spinner
```

---

## 6. Promise Chaining

Every `.then()` returns a **brand new Promise**. Whatever you return from inside `.then()` becomes the input to the next `.then()`.

```js
Promise.resolve(5)
    .then(num => {
        return num * 2;       // return 10 → next .then() gets 10
    })
    .then(num => {
        return num + 10;      // return 20 → next .then() gets 20
    })
    .then(num => {
        console.log(num);     // 20
    });
```

### What you return determines what the next step gets

```
return 42              →  next .then() receives 42
return "hello"         →  next .then() receives "hello"
return new Promise()   →  chain WAITS for it, passes resolved value
return nothing         →  next .then() receives undefined ← common bug
```

### Returning a Promise from inside `.then()` — nested chaining

```js
divide(10, 2)
    .then(result => {
        console.log(result);           // "10/2 : 5"
        return new Promise((resolve, reject) => {
            resolve('Nested resolved');
        });                            // ✅ must return it
    })
    .then(val => {
        console.log(val);              // "Nested resolved"
    });
```

> The most common chaining bug: creating a Promise inside `.then()` but forgetting to `return` it. Without `return`, the next `.then()` gets `undefined`.

---

## 7. Always `return` your Promise from a function

```js
// ❌ wrong — creates Promise but throws it away → returns undefined
function promiseFunction(timer) {
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('done'), timer);
    });
}

const p = promiseFunction(100);
console.log(p);   // undefined — not a Promise!

// ✅ correct — returns the Promise to the caller
function promiseFunction(timer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('done'), timer);
    });
}
```

> Rule: if your function creates a Promise and you want the caller to use it — you MUST `return` it. No `return` = `undefined` = everything breaks silently.

---

## 8. Promise Methods

### `Promise.resolve(value)` / `Promise.reject(reason)`

Shortcuts for already-settled Promises. No need to write `new Promise(...)`.

```js
Promise.resolve(42)
    .then(val => console.log(val));    // 42

Promise.reject('error')
    .catch(err => console.log(err));   // 'error'

// Useful when a function sometimes needs async, sometimes not
function getUser(cached) {
    if (cached) return Promise.resolve({ name: 'Rydham' });
    return fetchFromServer();   // real async
}
```

---

### `Promise.all(array)`

Runs ALL promises in parallel. Waits for every one to finish.

```
ALL resolve  →  array of all results  [val1, val2, val3]
ANY rejects  →  immediately rejects with that one error — rest are lost
```

```js
Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log(results);   // [val1, val2, val3] — same order as input
    })
    .catch(err => console.log(err));   // any one rejection lands here
```

> Results come back in the **same order as input** — not the order they finished.
> Use when you need ALL results to proceed.

---

### `Promise.allSettled(array)`

Like `Promise.all` but **never rejects**. Waits for every Promise to settle — success or failure — and gives you the outcome of each.

```
Always resolves → [{status:'fulfilled', value}, {status:'rejected', reason}]
Never rejects   → you get every outcome no matter what
```

```js
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach(r => {
            if (r.status === 'fulfilled') console.log('OK   :', r.value);
            else                          console.log('FAIL :', r.reason);
        });
    });
```

> Use when you need to know what happened to each Promise individually.
> Use `allSettled` over `all` when partial failure is acceptable.

---

### `Promise.race(array)`

First one to settle **wins** — whether resolve or reject. All others are ignored.

```
First to settle wins (resolve OR reject)
All others ignored completely
```

```js
Promise.race([promise1, promise2, promise3])
    .then(winner => console.log('Winner:', winner))
    .catch(err   => console.log('First rejected:', err));

// Classic timeout pattern
function fetchWithTimeout(url, ms) {
    const request = fetch(url);
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject('Timeout!'), ms)
    );
    return Promise.race([request, timeout]);
}
```

---

### `Promise.any(array)`

Resolves with the **first success**. Completely ignores rejections. Only rejects if ALL promises fail.

```
First to RESOLVE wins (ignores rejections)
ALL reject  →  AggregateError
```

```js
Promise.any([promise1, promise2, promise3])
    .then(first => console.log('First success:', first))
    .catch(err  => console.log('All failed:', err.message));  // AggregateError
```

> Difference from `race`: `race` can be won by a rejection. `any` only cares about the first resolve.

---

### Quick comparison table

| Method | Resolves when | Rejects when |
|---|---|---|
| `Promise.all` | ALL resolve | ANY rejects |
| `Promise.allSettled` | ALL settle (always) | Never |
| `Promise.race` | First settles (resolve) | First settles (reject) |
| `Promise.any` | First resolves | ALL reject |

---

## 9. Promise & the Event Loop

Promises feed into the **Microtask Queue** — higher priority than the Callback Queue (where `setTimeout` lives).

```
Priority: Synchronous code → Microtask Queue → Callback Queue
```

```js
console.log('1');
setTimeout(()             => console.log('4'), 0);   // Callback Queue
Promise.resolve().then(() => console.log('3'));       // Microtask Queue
console.log('2');

// Output: 1 → 2 → 3 → 4
// Even with 0ms delay, setTimeout runs AFTER Promise .then()
```

> The Event Loop always drains the **entire Microtask Queue** before processing even one Callback Queue task.

---

## 10. Common Mistakes

### Mistake 1 — not returning Promise from function

```js
// ❌
function load() { new Promise(resolve => resolve('done')); }
const p = load();  // undefined

// ✅
function load() { return new Promise(resolve => resolve('done')); }
```

### Mistake 2 — not returning from inside .then()

```js
// ❌ — next .then() gets undefined
.then(val => {
    new Promise(resolve => resolve('nested'));  // created but not returned
})
.then(val => console.log(val))   // undefined

// ✅
.then(val => {
    return new Promise(resolve => resolve('nested'));
})
.then(val => console.log(val))   // 'nested'
```

### Mistake 3 — not using return before reject

```js
// ❌ — resolve runs even when condition met
if (b === 0) reject('error');
resolve(result);   // still runs!

// ✅
if (b === 0) return reject('error');
resolve(result);
```

### Mistake 4 — no .catch() on a Promise

```js
// ❌ — unhandled rejection — crashes Node, silent in browser
fetchData().then(data => render(data));

// ✅
fetchData().then(data => render(data)).catch(err => handleError(err));
```

### Mistake 5 — confusing Promise.race and Promise.any

```js
// Promise.race — first to SETTLE wins (even a rejection)
// Promise.any  — first to RESOLVE wins (ignores rejections)
```

---

## 🎯 15 Interview Questions

**Q1. What is a Promise and what problem does it solve?**
A Promise is a JS object representing the eventual result of an async operation. It solves Callback Hell (deeply nested callbacks) and Inversion of Control (having to trust a third-party function to call your callback). Promises give you a structured, chainable, readable way to handle async code.

**Q2. What are the three states of a Promise?**
`pending` (waiting), `fulfilled` (resolved with a value), `rejected` (failed with a reason). Once settled (fulfilled or rejected), the state is permanent and can never change again.

**Q3. Where do `resolve` and `reject` come from?**
JS creates them internally and passes them to your executor function as parameters. You do not create them. They are plain functions — `resolve` triggers `.then()` callbacks, `reject` triggers `.catch()` callbacks. You can only call one of them, and only the first call has any effect.

**Q4. Is the executor function synchronous or asynchronous?**
Synchronous. The executor runs immediately when you write `new Promise(...)`. Wrapping code in a Promise does NOT make it async. What makes it async is what you put inside — `setTimeout`, `fetch`, etc. Only `.then()` and `.catch()` callbacks are async (Microtask Queue).

**Q5. What is Promise chaining and how does it work?**
Every `.then()` returns a new Promise. Whatever value you return from inside `.then()` becomes the input to the next `.then()`. If you return a plain value, it is wrapped automatically. If you return a Promise, the chain waits for it to settle. This allows writing flat, readable async pipelines instead of nested callbacks.

**Q6. What is the difference between `Promise.all` and `Promise.allSettled`?**
`Promise.all` rejects immediately if any one Promise rejects — you lose all other results. `Promise.allSettled` always waits for every Promise to settle and returns an array of `{status, value/reason}` objects — you get every outcome regardless. Use `all` when all must succeed. Use `allSettled` when you need to know each outcome individually.

**Q7. What is the difference between `Promise.race` and `Promise.any`?**
`Promise.race` settles with whichever Promise settles first — resolve or reject. `Promise.any` ignores rejections and resolves with the first success. `Promise.any` only rejects if every single Promise rejects, throwing an `AggregateError`.

**Q8. What will this output? Why?**
```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```
Output: `1 → 4 → 3 → 2`. `1` and `4` are synchronous. `3` goes to Microtask Queue (higher priority). `2` goes to Callback Queue (lower priority). Event Loop drains Microtask Queue before Callback Queue.

**Q9. What happens if you don't add `.catch()` to a Promise chain?**
An unhandled rejection occurs. In browsers it fires an `unhandledrejection` event. In Node.js it can crash the process. Always add `.catch()` or handle errors inside `.then(null, onRejected)`.

**Q10. Can a resolved Promise be rejected later?**
No. Once a Promise is settled its state is permanent. Calling `reject()` after `resolve()` (or vice versa) is completely ignored. Only the first call to `resolve` or `reject` has any effect.

**Q11. What is wrong with this code?**
```js
function loadUser() {
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('Rydham'), 1000);
    });
}
loadUser().then(val => console.log(val));
```
`loadUser()` returns `undefined` — not a Promise. The Promise is created but never returned. Calling `.then()` on `undefined` throws a TypeError. Fix: add `return` before `new Promise(...)`.

**Q12. What is `.finally()` used for?**
`.finally()` always runs after a Promise settles — regardless of whether it resolved or rejected. It receives no value. Used for cleanup that must happen either way — hiding loading spinners, closing database connections, logging.

**Q13. What is the output of this code?**
```js
Promise.resolve(1)
    .then(x => x + 1)
    .then(x => { x + 1 })   // no return!
    .then(x => console.log(x));
```
`undefined`. The second `.then()` has no `return` statement — it implicitly returns `undefined`. So the third `.then()` receives `undefined` and logs it.

**Q14. How does `Promise.all` handle the order of results?**
Results always come back in the same order as the input array — not the order they finished. If `promise3` resolves first, its result is still at index 2 in the results array.

**Q15. What is the difference between these two patterns?**
```js
// Pattern A
fetchUser().then(user => fetchPosts(user).then(posts => [user, posts]));

// Pattern B
fetchUser()
    .then(user  => fetchPosts(user))
    .then(posts => console.log(posts));
```
Pattern A uses nested `.then()` — unnecessary, creates the same callback pyramid Promises were meant to solve. Pattern B uses flat chaining — clean and readable. The only reason to nest is when you need access to multiple values at the same time (like both `user` and `posts`). Otherwise always keep chains flat.

---

## 💻 Code Problems

### Problem 1 — Promisify a callback function
```js
// Convert this callback-based function to return a Promise
function readFileCb(path, callback) {
    setTimeout(() => callback(null, 'file contents'), 500);
}

function readFile(path) {
    return new Promise((resolve, reject) => {
        readFileCb(path, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

readFile('test.txt').then(console.log);   // 'file contents'
```

### Problem 2 — Timeout with Promise.race
```js
function fetchWithTimeout(url, ms) {
    const request = new Promise(resolve =>
        setTimeout(() => resolve('Data from ' + url), 800)
    );
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject('Timed out after ' + ms + 'ms'), ms)
    );
    return Promise.race([request, timeout]);
}

fetchWithTimeout('api/user', 500)
    .then(console.log)
    .catch(console.log);   // 'Timed out after 500ms'

fetchWithTimeout('api/user', 1200)
    .then(console.log)
    .catch(console.log);   // 'Data from api/user'
```

### Problem 3 — Sequential vs Parallel
```js
function load(name, ms) {
    return new Promise(resolve =>
        setTimeout(() => resolve(name + ' loaded'), ms)
    );
}

// Sequential — 900ms total
async function sequential() {
    const a = await load('User',     300);
    const b = await load('Posts',    400);
    const c = await load('Settings', 200);
    console.log(a, b, c);
}

// Parallel — 400ms total (slowest)
async function parallel() {
    const [a, b, c] = await Promise.all([
        load('User',     300),
        load('Posts',    400),
        load('Settings', 200)
    ]);
    console.log(a, b, c);
}
```

### Problem 4 — Chain returning values
```js
// Predict the output
Promise.resolve(2)
    .then(x => x * 3)          // 6
    .then(x => x + 4)          // 10
    .then(x => {               // no return → undefined
        x * 2;
    })
    .then(x => console.log(x)) // undefined
    .catch(console.log);
```

### Problem 5 — allSettled for independent tasks
```js
function task(name, ms, fail = false) {
    return new Promise((resolve, reject) =>
        setTimeout(() =>
            fail ? reject(name + ' failed') : resolve(name + ' done'), ms
        )
    );
}

Promise.allSettled([
    task('Login',   200),
    task('Profile', 300, true),
    task('Posts',   150),
])
.then(results => {
    results.forEach(r => {
        if (r.status === 'fulfilled') console.log('OK  :', r.value);
        else                          console.log('ERR :', r.reason);
    });
});
// OK  : Login done
// ERR : Profile failed
// OK  : Posts done
```

---

## 🧠 Quick Revision — Key Rules

1. Promise has three states — `pending`, `fulfilled`, `rejected` — settled state never changes
2. `resolve` and `reject` are **created by JS** and passed to you — you don't make them
3. Executor runs **synchronously** — Promise wrapper does NOT make code async
4. `.then()` always returns a **new Promise** — enabling chaining
5. Always **`return`** from inside `.then()` — or next step gets `undefined`
6. Always **`return new Promise(...)`** from functions — or caller gets `undefined`
7. Always **`return reject(...)`** — or code after it still runs
8. `.catch()` catches rejections from **any** `.then()` above it in the chain
9. `.finally()` always runs — receives **no value** — used for cleanup
10. `Promise.all` — all or nothing · `Promise.allSettled` — always all · `Promise.race` — first wins · `Promise.any` — first success wins
11. Promise callbacks go to **Microtask Queue** — higher priority than `setTimeout`
12. `async/await` is **syntactic sugar** over Promises — same mechanism underneath

---

*📅 Revised: March 2026 | Part of daily JS revision series*