# 📘 JavaScript — `async` / `await` Interview Prep

> **Topics Covered:** What is async/await · Relation with Promises · async alone vs async+await · Sequential vs Parallel · Error handling · Promise.all with await · Common mistakes · 15 Interview Q&A · Code problems

---

## 1. What is `async` / `await`

`async/await` is **syntactic sugar over Promises**. It does not replace Promises — it sits on top of them. The JS engine converts your `async/await` code into Promise chains behind the scenes.

```
Promise is the vehicle.
async/await is the steering wheel.
The engine underneath is always the Event Loop.
```

---

## 2. What `async` does — exactly two things

```js
// Thing 1 — makes the function ALWAYS return a Promise
async function greet() {
    return "hello";          // plain string
}
greet();  // → Promise<"hello">   JS wrapped it automatically

// Thing 2 — allows await to be used inside it
async function main() {
    await something;         // only valid because function is async
}
```

> Every `async` function returns a Promise — always. No exceptions.

```js
async function a() { return 42;        }  // Promise<42>
async function b() { return "hello";   }  // Promise<"hello">
async function c() { return [1, 2, 3]; }  // Promise<[1,2,3]>
async function d() {                   }  // Promise<undefined>
```

---

## 3. What `await` does — exactly one thing

```
pauses the async function → waits for Promise to settle → unwraps the value
```

```js
async function main() {
    console.log("1");

    const user = await getUser();   // pauses HERE — waits for Promise
                                    // unwraps resolved value into 'user'

    console.log("2");               // runs only AFTER Promise settled
    console.log(user);              // plain value — not a Promise
}

main();
console.log("3");   // runs immediately — JS does NOT pause here

// Output: 1 → 3 → 2
```

> `await` pauses the **async function** — not the whole JS program. The Call Stack keeps running other code while it waits.

---

## 4. `async` alone vs `async` + `await`

### `async` alone — producing a Promise

```js
async function getNumber() {
    return 42;
}
// Caller must .then() or await this
getNumber().then(val => console.log(val));  // 42
```

You are saying — *"I am a Promise producer. I will hand you a Promise. Deal with it yourself."*

### `async` + `await` — consuming a Promise inside

```js
async function main() {
    const num = await getNumber();   // consuming the Promise
    console.log(num);                // 42 — plain value
    return num * 2;                  // auto-wrapped → Promise<84>
}
```

You are saying — *"I consume Promises from below using await, work with plain values like synchronous code, and whatever I return gets auto-wrapped as a Promise for whoever calls me."*

### Mental model

```
async alone
→ Promise producer
→ caller must .then() or await me

async + await together
→ Promise consumer internally (await unwraps)
→ writes logic like normal synchronous code
→ return value auto-wrapped as Promise (still a producer to caller)
```

> Every async function sits in the **middle of a chain** — consuming Promises from below, producing a Promise upward.

---

## 5. The exact translation JS does internally

```js
// What you write
async function getUser() {
    const user  = await fetchUser();
    const posts = await fetchPosts(user);
    return posts;
}

// What JS actually runs (behind the scenes)
function getUser() {
    return fetchUser()
        .then(user  => fetchPosts(user))
        .then(posts => posts);
}
```

These are **100% identical in behaviour**.

---

## 6. Error handling — `try` / `catch`

With Promises you use `.catch()`. With `async/await` you use `try/catch` — the same way you handle synchronous errors.

```js
// Promise chain way
fetchUser()
    .then(user  => console.log(user))
    .catch(err  => console.log(err));

// async/await way — identical behaviour
async function main() {
    try {
        const user = await fetchUser();
        console.log(user);
    } catch (err) {
        console.log(err);    // catches rejected Promise
    } finally {
        console.log("always runs");
    }
}
```

> If an awaited Promise rejects — it throws an error. `catch(err)` catches it exactly like a synchronous error.

### Common mistake — forgetting try/catch

```js
async function main() {
    const user = await fetchUser();   // ❌ if this rejects — unhandled rejection crash
}

async function main() {
    try {
        const user = await fetchUser();   // ✅ safe
    } catch (err) {
        console.log(err);
    }
}
```

---

## 7. Sequential vs Parallel — most important concept

### Sequential (slow — one waits for the other)

```js
async function sequential() {
    const user  = await fetchUser();    // waits 300ms
    const posts = await fetchPosts();   // THEN waits 500ms
    // total: 800ms
}
```

### Parallel (fast — both run at the same time)

```js
async function parallel() {
    const userPromise  = fetchUser();    // starts immediately
    const postsPromise = fetchPosts();   // also starts immediately

    const user  = await userPromise;    // now wait for both
    const posts = await postsPromise;
    // total: 500ms (only the slowest)
}
```

### Cleanest parallel pattern — `await Promise.all`

```js
async function parallel() {
    const [user, posts, settings] = await Promise.all([
        fetchUser(),
        fetchPosts(),
        fetchSettings()
    ]);
    // all three ran at same time
    // total time = slowest one only
}
```

> Rule: if two async operations don't depend on each other — run them in parallel. Sequential `await` is the most common performance mistake in async/await code.

---

## 8. `async/await` vs `.then()` — side by side

```js
// .then() chain
function getUser() {
    return fetchUser()
        .then(user  => fetchPosts(user))
        .then(posts => formatOutput(posts))
        .catch(err  => console.log(err));
}

// async/await — same thing, cleaner
async function getUser() {
    try {
        const user   = await fetchUser();
        const posts  = await fetchPosts(user);
        const output = await formatOutput(posts);
        return output;
    } catch (err) {
        console.log(err);
    }
}
```

| Feature | `.then()` chain | `async/await` |
|---|---|---|
| Error handling | `.catch()` | `try/catch` |
| Readability | Gets messy with 3+ steps | Reads like sync code |
| Debugging | Harder (stack traces) | Easier (clear line numbers) |
| Parallel execution | `Promise.all` | `await Promise.all` |
| Underlying mechanism | Promises | Promises (same thing) |

---

## 9. Common mistakes

### Mistake 1 — using `.then()` inside async (pointless)

```js
// ❌ wrong — not using async/await properly
async function main() {
    promise.then(val => {
        return val;   // returns to .then() chain, not out of main()
    });
}

// ✅ correct
async function main() {
    const val = await promise;
    return val;   // returns out of main() → Promise<val>
}
```

### Mistake 2 — sequential when you mean parallel

```js
// ❌ slow — 800ms total
const user  = await fetchUser();    // 300ms
const posts = await fetchPosts();   // 500ms after

// ✅ fast — 500ms total
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```

### Mistake 3 — await inside a non-async function

```js
// ❌ SyntaxError
function main() {
    const val = await fetchUser();   // cannot use await here
}

// ✅ correct
async function main() {
    const val = await fetchUser();
}
```

### Mistake 4 — await in a forEach (doesn't work as expected)

```js
// ❌ forEach does not await — all run but you can't wait for them
const ids = [1, 2, 3];
ids.forEach(async (id) => {
    const user = await fetchUser(id);   // fires but forEach won't wait
    console.log(user);
});

// ✅ use for...of instead
for (const id of ids) {
    const user = await fetchUser(id);   // properly awaited
    console.log(user);
}

// ✅ or parallel with Promise.all
const users = await Promise.all(ids.map(id => fetchUser(id)));
```

### Mistake 5 — forgetting that async function returns a Promise

```js
async function getValue() { return 42; }

const x = getValue();
console.log(x);        // ❌ Promise { 42 } — not 42

// ✅ must await it
const x = await getValue();   // inside another async function
console.log(x);               // 42
```

---

## 10. Real-world pattern

```js
function validateUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) resolve({ id, name: 'Rydham' });
            else reject('Invalid user ID');
        }, 200);
    });
}

function getUserPosts(user) {
    return new Promise(resolve => {
        setTimeout(() => resolve(['JS Closures', 'Event Loop']), 300);
    });
}

async function getUserDashboard(userId) {
    try {
        const user  = await validateUser(userId);   // step 1
        const posts = await getUserPosts(user);     // step 2 — needs user from step 1
        return { user: user.name, posts };          // auto-wrapped as Promise
    } catch (err) {
        console.log('Failed:', err);
    }
}

// Consuming the async function
getUserDashboard(1).then(data => console.log(data));

// Or inside another async function
async function main() {
    const data = await getUserDashboard(1);
    console.log(data);
}
```

---

## 🎯 15 Interview Questions

**Q1. What does the `async` keyword do to a function?**
Makes it always return a Promise. Even `return 42` becomes `Promise.resolve(42)` automatically. It also enables `await` to be used inside the function.

**Q2. What does `await` do?**
Pauses the async function, waits for the Promise to settle, then unwraps the resolved value. It does NOT block the Call Stack — other code keeps running while the function is paused.

**Q3. Can you use `await` outside an `async` function?**
No — you get a SyntaxError. `await` is only valid inside `async` functions. Exception: top-level `await` works in ES Modules (`.mjs` files or `type="module"` scripts).

**Q4. Is `async/await` different from Promises?**
No. It is 100% syntactic sugar over Promises. The JS engine converts it to `.then()` chains internally. An `async` function returns a Promise. `await` is `.then()` without the callback.

**Q5. What is the return value of an `async` function?**
Always a Promise — no exceptions. Whatever you return inside gets auto-wrapped in `Promise.resolve()`. To get the actual value, the caller must `.then()` it or `await` it.

**Q6. How do you handle errors in `async/await`?**
With `try/catch`. A rejected awaited Promise throws an error which `catch(err)` catches — exactly like synchronous error handling. Without `try/catch`, you get an unhandled Promise rejection.

**Q7. What is the difference between sequential and parallel `await`?**
Sequential — `await a(); await b();` — runs one after another, total time = sum of both. Parallel — `await Promise.all([a(), b()])` — runs simultaneously, total time = slowest one only.

**Q8. What will this output?**
```js
async function main() {
    console.log("1");
    const val = await Promise.resolve("hi");
    console.log("3", val);
}
main();
console.log("2");
```
Output: `1 → 2 → 3 hi`. `"1"` runs synchronously. `await` pauses `main()` — not JS. `"2"` runs immediately. Then Microtask Queue resumes `main()` with `"3 hi"`.

**Q9. Does `await` block the entire program?**
No. It only pauses the `async` function it is inside. The Call Stack continues running other synchronous code. The paused function resumes from the Microtask Queue when the Promise settles.

**Q10. Why doesn't `await` work inside `forEach`?**
`forEach` does not understand Promises — it calls each callback and moves on without waiting. Use `for...of` for sequential async iteration, or `Promise.all(array.map(...))` for parallel.

**Q11. What happens if you `await` a non-Promise value?**
It works fine. `await 42` is equivalent to `await Promise.resolve(42)` — it just resolves immediately. No error is thrown.

**Q12. What is the difference between these two?**
```js
async function a() { return Promise.resolve(42); }
async function b() { return 42; }
```
Both return `Promise<42>`. When you return a Promise from an `async` function, it is not double-wrapped — `async` unwraps it and re-wraps it. Both are identical to the caller.

**Q13. How do you run multiple async operations in parallel with `async/await`?**
Use `await Promise.all([p1, p2, p3])`. Start all Promises before awaiting any of them. This runs them simultaneously and gives you all results as an array when the slowest one finishes.

**Q14. What is the output?**
```js
async function foo() { return 42; }
console.log(foo());
```
`Promise { 42 }` — not `42`. The function returns a Promise. You must `await foo()` inside another async function or use `.then()` to get `42`.

**Q15. What is wrong with this code?**
```js
async function main() {
    promise.then(val => {
        return val;
    });
}
console.log(await main());
```
Two problems. First — `return val` returns to the `.then()` chain, not out of `main()`. `main()` itself returns `Promise<undefined>`. Second — `await` outside an `async` function is a SyntaxError.

---

## 🧠 Quick Revision — Key Rules

1. `async` function **always returns a Promise** — no exceptions
2. `await` **unwraps** a Promise into a plain value
3. `await` pauses the **function** — not the whole JS program
4. `await` can only be used **inside an `async` function**
5. Use `try/catch` for error handling — not `.catch()`
6. Sequential `await` = **times add up** (slow)
7. `await Promise.all([...])` = **runs in parallel** (fast)
8. `async/await` is **identical to Promises** underneath — just cleaner syntax
9. Returning from inside `.then()` inside an `async` function goes to the chain — **not out of the function**
10. `forEach` does not await — use `for...of` or `Promise.all(array.map(...))`

---

*📅 Revised: March 2026 | Part of daily JS revision series*