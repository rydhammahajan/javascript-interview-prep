# 📘 JavaScript — Asynchronous JS & Event Loop

> **Topics Covered:** Sync vs Async · Execution Context Recap · Web APIs · Browser Architecture · `setTimeout` · `fetch()` · Event Listeners · Callback Queue · Microtask Queue · Event Loop · Starvation · Trust Issues with `setTimeout`

---

## 1. 🔄 JavaScript is Single-Threaded & Synchronous

JavaScript is a **single-threaded, synchronous** programming language.

- It has a **single Call Stack** → this Call Stack is present in the JS engine
- **Single-threaded** → can execute **one command at a time**
- **Synchronous** → in a **specific order** → can go to the next line only when the current line is fully executed

```js
function a() {
  console.log("a");
}
a();
console.log("End");
// Output: "a" → "End"
// Call Stack: a() pushed → a() completes → popped → console.log runs → GEC pops out
```

> ⭐ **Main job of Call Stack** → to execute anything that comes inside it.
> **Call Stack does NOT wait for anyone** — it executes quickly.

### The Problem
> **What if we have to wait for something?** (e.g., a timer, a network request)
> We **can't block the Call Stack** waiting for it.
> This is where **Asynchronous JS** comes in.

---

## 2. 🌐 Browser Architecture & Web APIs

JavaScript alone can't do everything. The **Browser gives JS superpowers** through **Web APIs**.

```
┌─────────────────────────────────────────────────────┐
│                     BROWSER                          │
│  ┌──────────────┐      ┌────────────────────────┐   │
│  │  Call Stack  │      │       Web APIs          │   │
│  │              │      │  * setTimeout()         │   │
│  │              │      │  * DOM APIs (document)  │   │
│  │    GEC       │      │  * fetch()              │   │
│  └──────────────┘      │  * localStorage         │   │
│       JS Engine        │  * console              │   │
│                        │  * location/geolocation │   │
│                        └────────────────────────┘   │
│                                                      │
│          ┌──────────────────────────────┐            │
│          │  Callback Queue (Macrotask)  │            │
│          └──────────────────────────────┘            │
│          ┌──────────────────────────────┐            │
│          │     Microtask Queue          │            │
│          └──────────────────────────────┘            │
│                   ↑ Event Loop ↑                     │
└─────────────────────────────────────────────────────┘
```

### Web APIs — Browser's Superpowers
The browser gives the JS engine access to all these super powers inside the **global object → `window`**:

| Web API | Purpose |
|---------|---------|
| `setTimeout()` | Timer-based callback |
| DOM APIs (`document`) | Manipulate HTML elements |
| `fetch()` | Network requests to servers |
| `localStorage` | Persist data in browser |
| `console` | Logging to devtools |
| `location` / `geolocation` | Location data |

```js
// These are accessible via window object
window.setTimeout()
window.document.getElementById()
// We normally skip 'window.' prefix since it's global
```

> **Browser gives access to all these super powers inside the JS engine via the global object `window`.**

---

## 3. ⏱️ How `setTimeout()` Works — Step by Step

```js
console.log("start");

setTimeout(function cb() {
  console.log("Callback");
}, 5000);

console.log("end");
```

### Step-by-Step Execution:

**Step 1** → GEC is created and pushed to Call Stack.

**Step 2** → `console.log("start")` executes → **"start"** is printed.

**Step 3** → `setTimeout` is encountered.
- JS registers the callback `cb` with the **Web API (Timer)**
- Timer starts counting 5000ms in the background
- JS does **NOT wait** — moves on immediately

**Step 4** → `console.log("end")` executes → **"end"** is printed.

**Step 5** → GEC pops off the Call Stack. **Call Stack is now empty.**

**Step 6** → After 5000ms, the timer expires.
- The callback `cb` is moved to the **Callback Queue**

**Step 7** → **Event Loop** checks:
- Is the Call Stack empty? ✅ Yes
- Is there something in the Callback Queue? ✅ Yes
- → Event Loop pushes `cb` into the Call Stack

**Step 8** → `cb()` executes → **"Callback"** is printed.

```
Output:
start
end
Callback    (after 5 seconds)
```

---

## 4. 🖱️ How Event Listeners Work

```js
console.log("start");

document.getElementById("btn")
  .addEventListener("click", function cb() {
    console.log("Callback");
  });

console.log("end");
```

- `addEventListener` is a **DOM API** (Web API) — superpower given by browser
- The callback `cb` is registered with the **Web API environment**
- When user **clicks the button** → `cb` is moved to the **Callback Queue**
- Event Loop checks if Call Stack is empty → pushes `cb` to Call Stack → executes

> ⭐ When user clicks, it sits in Callback Queue and **waits for its turn**.
> All callbacks can be queued in the **Callback Queue**.

---

## 5. 🌐 How `fetch()` Works — Microtask Queue

`fetch()` returns a **Promise**. Callbacks from Promises go into the **Microtask Queue**, NOT the Callback Queue.

```js
console.log("start");

setTimeout(function cbT() {
  console.log("CBT");
}, 5000);

fetch("https://api.example.com/data")
  .then(function cbF() {
    console.log("CBF");
  });

console.log("end");
```

### Step-by-Step:

1. `console.log("start")` → **"start"** printed
2. `setTimeout(cbT, 5000)` → registered with Timer Web API (5s countdown)
3. `fetch(...)` → registered with Network Web API, starts fetching
4. `.then(cbF)` → cbF will be called when fetch resolves
5. `console.log("end")` → **"end"** printed
6. GEC pops off → Call Stack empty
7. Assume fetch resolves quickly (before 5s)
   - `cbF` → goes to **Microtask Queue** ✅
8. After 5s, timer expires
   - `cbT` → goes to **Callback Queue**
9. Event Loop:
   - Checks Microtask Queue first (higher priority!) → pushes `cbF`
   - `cbF` executes → **"CBF"** printed
   - Then checks Callback Queue → pushes `cbT`
   - `cbT` executes → **"CBT"** printed

```
Output:
start
end
CBF       (from fetch — Microtask Queue, higher priority)
CBT       (from setTimeout — Callback Queue)
```

---

## 6. 🔁 Event Loop — The Heart of Async JS

> **Event Loop's only job:** Continuously monitor the Call Stack and the Callback/Microtask Queues. When the Call Stack is empty, it pushes the next function from the queue into the Call Stack.

```
                    ┌────────────────┐
                    │   Call Stack   │
                    └───────┬────────┘
                            │
                       Event Loop
                     (continuously
                      monitors)
                    /              \
    ┌──────────────────┐    ┌────────────────────┐
    │  Microtask Queue │    │  Callback Queue     │
    │  (Promises,      │    │  (setTimeout,       │
    │   MutationObs.)  │    │   setInterval,      │
    │  HIGHER PRIORITY │    │   DOM events)       │
    └──────────────────┘    └────────────────────┘
```

### Event Loop Rules:
1. Call Stack executes synchronous code first
2. When Call Stack is **empty**, Event Loop checks queues
3. **Microtask Queue is always checked FIRST** (higher priority)
4. Only when Microtask Queue is empty → Callback Queue is processed
5. **One task at a time** is moved from queue → Call Stack

---

## 7. 📬 Callback Queue vs Microtask Queue

| Feature | Callback Queue (Macrotask Queue) | Microtask Queue |
|---------|----------------------------------|-----------------|
| Also called | Macrotask Queue / Task Queue | Job Queue |
| What goes here | `setTimeout`, `setInterval`, DOM event listeners | Promises (`.then`, `.catch`), `MutationObserver` |
| Priority | ❌ Lower | ✅ **Higher** |
| Processed when | After Microtask Queue is empty | Before any Callback Queue task |

### Priority:
```
⭐ Priority → Microtask Queue > Macrotask (Callback) Queue
```

---

## 8. ⚠️ Trust Issues with `setTimeout(0)`

```js
console.log("start");

setTimeout(function cb() {
  console.log("Callback");
}, 0);  // 0ms delay!

console.log("end");
```

```
Output:
start
end
Callback   ← even with 0ms, this runs LAST!
```

**Why?** Even with `0ms` delay:
- `cb` still goes through the Web API → Callback Queue → Event Loop cycle
- It **cannot** run until the Call Stack is **completely empty**
- If the GEC is executing millions of lines of code, `cb` will **wait** in the Callback Queue the entire time

> **That's why we say `setTimeout` has a "Trust Issue"** — the delay is a **minimum guaranteed time**, not an exact time. The actual execution depends on when the Call Stack is free.

```js
// Extreme case — setTimeout(0) still waits
setTimeout(() => console.log("cb"), 0);

// If this runs for 10 seconds, setTimeout callback waits full 10 seconds
for (let i = 0; i < 1_000_000_000; i++) {
  // blocking the Call Stack
}
console.log("done"); // runs after 10s
// "cb" only runs after "done" — even though delay was 0!
```

---

## 9. 🍽️ Callback Queue Starvation

**Starvation** occurs when the Microtask Queue keeps getting filled with new tasks faster than they are processed, causing the Callback Queue tasks to **never get a chance to execute**.

```
Microtask Queue: [task1, task2, task3, task4...] → keeps growing
Callback Queue:  [cb1]  → waiting forever → STARVED ❌
```

> If Promises keep resolving and adding new `.then` callbacks, `setTimeout` callbacks may **never execute**.

---

## 🎯 Interview Questions

**Q1. What is the Event Loop in JavaScript?**
The Event Loop is a mechanism that continuously monitors the Call Stack and the task queues (Microtask and Callback). When the Call Stack is empty, it picks the next task from the Microtask Queue first (if available), then the Callback Queue, and pushes it onto the Call Stack for execution. This is how JS achieves asynchronous behavior despite being single-threaded.

**Q2. What is the difference between Microtask Queue and Callback (Macrotask) Queue?**
The Microtask Queue holds callbacks from Promises (`.then`/`.catch`) and `MutationObserver`. The Callback Queue (Macrotask Queue) holds callbacks from `setTimeout`, `setInterval`, and DOM event listeners. The Microtask Queue has **higher priority** — the Event Loop always drains the entire Microtask Queue before processing even one task from the Callback Queue.

**Q3. What are Web APIs? Give examples.**
Web APIs are superpowers provided by the browser (not part of JS itself) that are accessible through the global `window` object. Examples: `setTimeout()`, DOM APIs (`document.getElementById`), `fetch()`, `localStorage`, `console`, `geolocation`. They allow JS to interact with the browser environment.

**Q4. What will be the output?**
```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```
**Answer:** `1 → 4 → 3 → 2`
- `1` and `4` are synchronous → run first
- `3` (Promise) → Microtask Queue → runs before setTimeout
- `2` (setTimeout) → Callback Queue → runs last

**Q5. Why is `setTimeout(fn, 0)` not exactly 0ms?**
Because even with 0ms delay, the callback still goes through: Web API → Callback Queue → Event Loop → Call Stack. It can only execute when the Call Stack is completely empty. If the main thread is busy, it will wait regardless of the timer value. The delay is a **minimum** guarantee, not an exact one.

**Q6. What is Callback Queue Starvation?**
Starvation occurs when the Microtask Queue is continuously filled with new tasks (e.g., recursive Promise chains), preventing the Callback Queue from ever getting processed. The `setTimeout` callbacks in the Callback Queue never get a chance to execute because the Event Loop always prioritizes the Microtask Queue.

**Q7. What goes into the Microtask Queue?**
Callbacks that come through **Promises** (`.then`, `.catch`, `.finally`) and **`MutationObserver`** go into the Microtask Queue.

**Q8. What goes into the Callback Queue?**
Callbacks from **`setTimeout`**, **`setInterval`**, **DOM event listeners** (like `click`, `mouseover`), and **`XMLHttpRequest`** go into the Callback Queue (Macrotask Queue).

**Q9. Is JavaScript truly asynchronous?**
JavaScript itself is synchronous and single-threaded. Asynchronous behavior is achieved through the **browser's Web APIs** (which run outside the JS engine), the **Callback/Microtask Queues**, and the **Event Loop**. The browser handles things like timers and network requests separately, then notifies JS when they're done via the queues.

**Q10. What is the order of execution in the Event Loop?**
1. Execute all synchronous code (Call Stack)
2. Process all tasks in the **Microtask Queue** (completely drain it)
3. Process **one task** from the **Callback Queue**
4. Go back to step 2 (check Microtask Queue again before next Callback Queue task)
5. Repeat

---

## 💻 Code Problems & Output Predictions

### Problem 1 — Classic Event Loop order
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

// Output: A → D → C → B
// A, D → synchronous
// C → Microtask (Promise) — higher priority
// B → Macrotask (setTimeout) — lower priority
```

### Problem 2 — Nested Promises vs setTimeout
```js
console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1");
    return Promise.resolve();
  })
  .then(() => console.log("promise 2"));

console.log("end");

// Output: start → end → promise 1 → promise 2 → timeout
```

### Problem 3 — setTimeout Trust Issue
```js
console.log("start");
setTimeout(() => console.log("timer"), 0);

// Blocking operation
const end = Date.now() + 3000;
while (Date.now() < end) {} // blocks for 3 seconds

console.log("end");

// Output: start → end (after 3s) → timer
// Timer callback had to WAIT even though delay was 0ms!
```

### Problem 4 — Event Listener + Closure
```js
function attachCounter() {
  let count = 0;
  document.getElementById("btn")
    .addEventListener("click", function () {
      count++;
      console.log("Clicked:", count);
    });
}
attachCounter();
// Each click: Clicked: 1, Clicked: 2, Clicked: 3...
// Closure keeps 'count' alive even though attachCounter() is done
```

### Problem 5 — Starvation simulation
```js
// This could starve the setTimeout callback
function keepPromising() {
  return Promise.resolve().then(keepPromising); // infinite microtasks!
}
keepPromising();
setTimeout(() => console.log("I may never run!"), 0);
// setTimeout callback may be starved by infinite Microtask Queue
```

### Problem 6 — `fetch()` with Promise chain
```js
console.log("1");

fetch("https://api.example.com")
  .then(() => console.log("2"))
  .then(() => console.log("3"));

setTimeout(() => console.log("4"), 0);

console.log("5");

// Output: 1 → 5 → 2 → 3 → 4
// 1, 5 → synchronous
// 2, 3 → Promise .then callbacks → Microtask Queue
// 4 → setTimeout → Callback Queue (lowest priority)
```

### Problem 7 — What does Event Loop check first?
```js
// Priority demonstration
setTimeout(() => console.log("Macro 1"), 0);
setTimeout(() => console.log("Macro 2"), 0);

Promise.resolve().then(() => console.log("Micro 1"));
Promise.resolve().then(() => console.log("Micro 2"));

// Output: Micro 1 → Micro 2 → Macro 1 → Macro 2
// ALL microtasks run before ANY macrotask
```

### Problem 8 — async/await (syntactic sugar over Promises)
```js
async function main() {
  console.log("1");
  await Promise.resolve();
  console.log("2"); // this goes to Microtask Queue
  console.log("3");
}

main();
console.log("4");

// Output: 1 → 4 → 2 → 3
// "1" runs synchronously
// await suspends main() → "4" runs
// main() resumes from Microtask Queue → "2" → "3"
```

---

## 📊 Complete Architecture Summary

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER                                │
│                                                               │
│   ┌─────────────┐    ┌──────────────────────────────────┐    │
│   │  JS ENGINE  │    │           WEB APIs                │    │
│   │             │    │  setTimeout | DOM | fetch()       │    │
│   │ ┌─────────┐ │    │  localStorage | console | etc.   │    │
│   │ │  Call   │ │    └──────────────────────────────────┘    │
│   │ │  Stack  │ │              ↓ (when ready)                 │
│   │ │         │ │    ┌──────────────────────────────────┐    │
│   │ │  GEC    │ │    │         QUEUES                    │    │
│   │ └─────────┘ │    │  ┌──────────────────────────┐    │    │
│   └─────────────┘    │  │ Microtask Queue (HIGH) ✅ │    │    │
│         ↑            │  │ Promises, MutationObserver│    │    │
│    Event Loop        │  └──────────────────────────┘    │    │
│    (monitors)        │  ┌──────────────────────────┐    │    │
│         ↑            │  │ Callback Queue (LOW) ⬇   │    │    │
│         └────────────│  │ setTimeout, setInterval,  │    │    │
│                      │  │ DOM events               │    │    │
│                      │  └──────────────────────────┘    │    │
│                      └──────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘

Priority: Synchronous Code → Microtask Queue → Callback Queue
```

---

## 🧠 Quick Revision — Key Rules

1. **JS is single-threaded** — one thing at a time
2. **Call Stack never waits** — it executes and moves on
3. **Web APIs** are browser superpowers — they handle async tasks outside JS
4. **Callback Queue** (Macrotask) — `setTimeout`, `setInterval`, event listeners
5. **Microtask Queue** — Promise callbacks, `MutationObserver`
6. **Microtask Queue has HIGHER priority** than Callback Queue
7. **Event Loop** — monitors Call Stack; when empty, pushes from Microtask Queue first, then Callback Queue
8. **`setTimeout(fn, 0)`** — delay is MINIMUM, not exact; still goes through full cycle
9. **Starvation** — Microtask Queue flooding prevents Callback Queue from ever executing
10. **Whole closure is passed** to the Callback Queue, not just the function

---

*📅 Revised: March 2026 | Part of daily JS revision series*