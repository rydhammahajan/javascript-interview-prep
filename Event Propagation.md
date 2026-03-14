# 📘 JavaScript — Event Propagation Interview Prep

> **Topics Covered:** What is an Event · Three Phases · Bubbling · Capturing · event.target vs event.currentTarget · stopPropagation · preventDefault · stopImmediatePropagation · Event Delegation · Interview Q&A · Code Problems

---

## 1. What is Event Propagation

When you click something in a browser, JS does not just fire one event on that element. The event travels through the DOM tree in a specific path — this travelling is called **Event Propagation**.

Every single click goes through **three phases**, always, in this exact order:

```
Phase 1 — CAPTURING  (Window → Document → html → body → ... → target)
Phase 2 — TARGET     (the actual element you clicked)
Phase 3 — BUBBLING   (target → ... → body → html → Document → Window)
```

---

## 2. Three Phases in Detail

### Phase 1 — Capturing (top → down)

The event starts at the very top (Window) and travels **down** through every ancestor toward the clicked element.

```
Window
  └── Document
        └── html
              └── body
                    └── div#outer
                          └── div#middle
                                └── div#inner  ← target
```

### Phase 2 — Target

The event reaches the actual element that was clicked. Both capturing and bubbling handlers fire at the target.

### Phase 3 — Bubbling (bottom → up)

After reaching the target, the event **bubbles back up** through every parent, all the way to Window.

```
div#inner → div#middle → div#outer → body → html → Document → Window
```

> By default, `addEventListener` listens in the **bubbling phase**. To listen in capturing phase, pass `{ capture: true }` as the third argument.

---

## 3. Bubbling — Default Behaviour

When you click a child element, the event fires on that element first, then bubbles up through every parent — even though you only clicked the child.

```html
<div id="outer">
  <div id="middle">
    <div id="inner">Click me</div>
  </div>
</div>
```

```js
document.getElementById('inner').addEventListener('click', () => {
    console.log('inner fired');    // 1st
});
document.getElementById('middle').addEventListener('click', () => {
    console.log('middle fired');   // 2nd — bubbled up
});
document.getElementById('outer').addEventListener('click', () => {
    console.log('outer fired');    // 3rd — bubbled up again
});

// Click on inner div — output:
// inner fired
// middle fired
// outer fired
```

> Clicking inner triggers ALL three handlers — that is bubbling.

---

## 4. Capturing — Reverse Direction

Add `true` or `{ capture: true }` as the third argument to listen in the capturing phase. Now the **outermost element fires first**.

```js
document.getElementById('outer').addEventListener('click', () => {
    console.log('outer fired');    // 1st — capturing, top first
}, true);

document.getElementById('middle').addEventListener('click', () => {
    console.log('middle fired');   // 2nd
}, true);

document.getElementById('inner').addEventListener('click', () => {
    console.log('inner fired');    // 3rd — target, last
}, true);

// Click on inner — output:
// outer fired
// middle fired
// inner fired
```

### Bubbling vs Capturing — order comparison

| | Bubbling (default) | Capturing |
|---|---|---|
| Direction | Bottom → Up | Top → Down |
| Third argument | `false` or nothing | `true` or `{capture:true}` |
| Who fires first | The clicked element | The outermost ancestor |
| Who fires last | The outermost ancestor | The clicked element |
| How common | Very common | Rarely used |

---

## 5. `event.target` vs `event.currentTarget`

This is one of the most asked interview questions on event propagation.

```js
document.getElementById('outer').addEventListener('click', function(e) {
    console.log(e.target);          // element actually clicked
    console.log(e.currentTarget);   // element THIS listener is attached to
});
```

```js
// If you click on inner:
e.target         // → div#inner  (where the click originated)
e.currentTarget  // → div#outer  (where this listener lives)

// These are the SAME only when you click the element the listener is on
```

| | `event.target` | `event.currentTarget` |
|---|---|---|
| What it is | Element actually clicked | Element listener is attached to |
| Changes during propagation | No — always the origin | Yes — changes as event travels |
| Use case | Event delegation | Know which element is handling |

---

## 6. `stopPropagation()`

Stops the event from travelling to **parent elements**. The event fires on the current element but does NOT bubble up (or capture down) past it.

```js
document.getElementById('middle').addEventListener('click', function(e) {
    console.log('middle fired');
    e.stopPropagation();    // stops here — outer will NOT fire
});

document.getElementById('outer').addEventListener('click', function(e) {
    console.log('outer fired');    // NEVER runs if middle stops it
});
```

### Important — stopPropagation does NOT stop other handlers on the SAME element

```js
const btn = document.getElementById('btn');

btn.addEventListener('click', function(e) {
    console.log('Handler 1');
    e.stopPropagation();   // stops bubbling to parents
});
btn.addEventListener('click', function() {
    console.log('Handler 2');   // ✅ still runs — same element
});
btn.addEventListener('click', function() {
    console.log('Handler 3');   // ✅ still runs — same element
});

// Output:
// Handler 1
// Handler 2
// Handler 3
// (parent listeners blocked)
```

---

## 7. `stopImmediatePropagation()`

Stops the event from travelling to parent elements AND stops all other handlers on the **same element** registered after it.

```js
const btn = document.getElementById('btn');

btn.addEventListener('click', function(e) {
    console.log('Handler 1');
    e.stopImmediatePropagation();  // stops everything after this
});
btn.addEventListener('click', function() {
    console.log('Handler 2');   // ❌ never runs
});
btn.addEventListener('click', function() {
    console.log('Handler 3');   // ❌ never runs
});

// Output:
// Handler 1
// (Handler 2, Handler 3, and all parents are all blocked)
```

### stopPropagation vs stopImmediatePropagation

```
stopPropagation()
  → stops event going to PARENT elements           ✅
  → stops other handlers on SAME element           ❌ (they still run)

stopImmediatePropagation()
  → stops event going to PARENT elements           ✅
  → stops other handlers on SAME element           ✅
  → everything after this call is completely dead
```

| | `stopPropagation` | `stopImmediatePropagation` |
|---|---|---|
| Stops bubbling to parents | ✅ Yes | ✅ Yes |
| Stops other handlers on same element | ❌ No | ✅ Yes |
| Use case | Normal propagation control | Complete lockdown of event |

> Order matters — `stopImmediatePropagation` only kills handlers registered **after** it. Handlers registered **before** it already ran and cannot be stopped.

---

## 8. `preventDefault()`

Stops the **browser's default action** for the event. Has nothing to do with propagation — the event still bubbles normally.

```js
// Prevent form from submitting
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();   // page does NOT reload
    // validate and handle manually
});

// Prevent link from navigating
document.getElementById('link').addEventListener('click', function(e) {
    e.preventDefault();   // browser does NOT navigate to href
    console.log('link clicked but not navigated');
});

// Prevent right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
```

### The critical difference — three separate things

```
stopPropagation()       → stops event TRAVELLING through DOM
preventDefault()        → stops BROWSER'S DEFAULT ACTION
stopImmediatePropagation() → stops TRAVELLING + all same-element handlers
```

> These are completely independent. Calling one does NOT affect the others.

```js
link.addEventListener('click', function(e) {
    e.preventDefault();    // link won't navigate
    // event still bubbles up to parents — propagation NOT stopped
});
```

---

## 9. Event Delegation

The most important practical application of bubbling. Instead of adding a listener to **every child**, add **one listener to the parent**. When any child is clicked, the event bubbles up to the parent listener. Use `event.target` to identify which child was clicked.

### Without delegation — bad

```js
// If you have 100 list items — 100 separate listeners
document.getElementById('item1').addEventListener('click', handler);
document.getElementById('item2').addEventListener('click', handler);
document.getElementById('item3').addEventListener('click', handler);
// ... 97 more
// Problems:
// - Memory expensive (100 listeners)
// - Breaks for dynamically added items
// - Repetitive code
```

### With delegation — good

```js
// ONE listener on the parent handles ALL children
document.getElementById('list').addEventListener('click', function(e) {
    const item = e.target.closest('li');   // find which li was clicked
    if (!item) return;                     // click was not on an li
    console.log('Clicked:', item.textContent);
    console.log('Data:', item.dataset.id);
});

// Works for:
// - All existing items ✅
// - Items added to the list dynamically in future ✅
```

### Real-world delegation example

```js
// Dynamic todo list
const list = document.getElementById('todo-list');

// Add new item
document.getElementById('add-btn').addEventListener('click', function() {
    const li = document.createElement('li');
    li.textContent = 'New task';
    li.dataset.id = Date.now();
    list.appendChild(li);
    // No need to add a new listener — delegation handles it automatically
});

// ONE handler for all items — current and future
list.addEventListener('click', function(e) {
    const item = e.target.closest('li');
    if (!item) return;
    item.classList.toggle('done');
    console.log('Toggled:', item.dataset.id);
});
```

### Why delegation works

```
You click li#item3
  ↓ event fires on li#item3 (target)
  ↓ bubbles up to ul#list
  ↓ ul#list listener fires
  ↓ e.target = li#item3  ← you know exactly what was clicked
```

---

## 10. All Syntax Patterns

```js
// Bubbling — default
element.addEventListener('click', handler);
element.addEventListener('click', handler, false);

// Capturing
element.addEventListener('click', handler, true);
element.addEventListener('click', handler, { capture: true });

// Stop bubbling — does NOT stop same-element handlers
element.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Stop everything — same-element handlers + bubbling
element.addEventListener('click', function(e) {
    e.stopImmediatePropagation();
});

// Prevent default browser action — does NOT stop propagation
element.addEventListener('click', function(e) {
    e.preventDefault();
});

// event.target vs event.currentTarget
parent.addEventListener('click', function(e) {
    e.target          // element actually clicked (origin)
    e.currentTarget   // element this listener is attached to (= this)
});

// Event delegation pattern
document.getElementById('list').addEventListener('click', function(e) {
    const item = e.target.closest('li');
    if (!item) return;
    console.log(item.textContent);
});

// Remove event listener
function handler() { console.log('clicked'); }
element.addEventListener('click', handler);
element.removeEventListener('click', handler);  // must pass same function reference
```

---

## 🎯 15 Interview Questions

**Q1. What is Event Propagation?**
Event Propagation is the mechanism by which an event travels through the DOM tree. When an element is clicked, the event does not just fire on that element — it travels through three phases: capturing (top to down), target (the clicked element), and bubbling (bottom to up).

**Q2. What are the three phases of event propagation?**
Capturing — event travels from Window down to the target element. Target — event fires on the element that was actually clicked. Bubbling — event travels back up from the target to Window. All three happen on every event, always in this order.

**Q3. What is Event Bubbling?**
Event Bubbling is the default behaviour where an event fired on a child element automatically propagates upward through all its parent elements. Clicking a nested `div` also triggers click handlers on every ancestor `div`, `body`, `html`, and `window`.

**Q4. What is Event Capturing?**
Event Capturing is the opposite of bubbling — the event starts at the top of the DOM and travels down to the target. Listeners in capturing phase fire before bubbling listeners. Enable it by passing `true` or `{ capture: true }` as the third argument to `addEventListener`.

**Q5. What is the difference between `event.target` and `event.currentTarget`?**
`event.target` is the element that was actually clicked — the origin of the event. It never changes during propagation. `event.currentTarget` is the element that the currently-executing listener is attached to — it changes as the event travels through the DOM.

**Q6. What does `stopPropagation()` do?**
It stops the event from travelling to parent elements (stops bubbling or capturing). However, it does NOT stop other handlers attached to the same element for the same event — those still run.

**Q7. What does `stopImmediatePropagation()` do?**
It stops both propagation to parent elements AND all other handlers on the same element registered after it. Nothing else gets to handle the event. Only handlers registered before it have already run.

**Q8. What is the difference between `stopPropagation` and `stopImmediatePropagation`?**
`stopPropagation` stops the event from reaching parent elements but other handlers on the same element still fire. `stopImmediatePropagation` stops parent propagation AND kills all other same-element handlers registered after it — a complete lockdown.

**Q9. What does `preventDefault()` do? How is it different from `stopPropagation()`?**
`preventDefault()` stops the browser's default action for an event — like a form submitting, a link navigating, or a context menu appearing. It does NOT stop event propagation. `stopPropagation()` stops the event travelling through the DOM but does NOT stop the browser's default action. They are completely independent.

**Q10. What is Event Delegation?**
Event Delegation is a pattern where instead of attaching listeners to every individual child element, you attach one listener to the parent. When a child is clicked, the event bubbles up to the parent listener. You use `event.target` to identify which child was actually clicked. It is more memory efficient and automatically handles dynamically added elements.

**Q11. Why is Event Delegation useful for dynamically added elements?**
Because the listener is on the parent which already exists in the DOM. When new children are added later, they have no listener themselves — but when clicked, their event bubbles up to the parent listener which handles them automatically. A listener directly on the child would not exist for elements added after the initial page load.

**Q12. What will this output?**
```js
document.getElementById('child').addEventListener('click', () => console.log('child'));
document.getElementById('parent').addEventListener('click', () => console.log('parent'));
document.getElementById('grandparent').addEventListener('click', () => console.log('grandparent'));
// User clicks child
```
Output: `child → parent → grandparent`. Event fires on child first, then bubbles up through each parent in order.

**Q13. Can you stop an event from bubbling at a specific element?**
Yes — call `e.stopPropagation()` inside the listener of that element. The event fires on that element's listener and stops there — no further ancestors receive it.

**Q14. What is the `closest()` method and why is it used in event delegation?**
`element.closest(selector)` traverses up the DOM tree from the element and returns the first ancestor that matches the selector (including itself). In event delegation, `e.target.closest('li')` is used because the user might click on text or an icon inside the `li`, not the `li` itself — `closest` finds the nearest `li` ancestor regardless.

**Q15. What happens if both capturing and bubbling listeners exist on the same element?**
At the target element (the one actually clicked), both capturing and bubbling listeners fire — in the order they were registered. For ancestor elements, capturing listeners fire during phase 1 (top to down) and bubbling listeners fire during phase 3 (bottom to up).

---

## 💻 Code Problems

### Problem 1 — Predict bubbling output
```js
document.getElementById('inner').addEventListener('click', () => console.log('A'));
document.getElementById('middle').addEventListener('click', () => console.log('B'));
document.getElementById('outer').addEventListener('click', () => console.log('C'));

// User clicks inner — output?
// A → B → C   (bubbling — inner first, up to outer)
```

### Problem 2 — stopPropagation
```js
document.getElementById('inner').addEventListener('click', (e) => {
    console.log('inner');
    e.stopPropagation();
});
document.getElementById('outer').addEventListener('click', () => console.log('outer'));

// User clicks inner — output?
// inner   (outer is blocked by stopPropagation)
```

### Problem 3 — stopPropagation does NOT block same-element handlers
```js
const btn = document.getElementById('btn');
btn.addEventListener('click', (e) => { console.log('H1'); e.stopPropagation(); });
btn.addEventListener('click', () => console.log('H2'));
document.body.addEventListener('click', () => console.log('body'));

// Output?
// H1
// H2       ← still runs (same element)
// (body blocked)
```

### Problem 4 — stopImmediatePropagation
```js
const btn = document.getElementById('btn');
btn.addEventListener('click', (e) => { console.log('H1'); e.stopImmediatePropagation(); });
btn.addEventListener('click', () => console.log('H2'));
document.body.addEventListener('click', () => console.log('body'));

// Output?
// H1       ← only this runs
// H2 and body are both blocked
```

### Problem 5 — Event Delegation implementation
```js
// Add ONE listener to ul#list that logs the text of whichever li is clicked
const list = document.getElementById('list');

list.addEventListener('click', function(e) {
    const item = e.target.closest('li');
    if (!item) return;
    console.log('Clicked:', item.textContent);
});
```

### Problem 6 — target vs currentTarget
```js
document.getElementById('parent').addEventListener('click', function(e) {
    console.log('target:', e.target.id);
    console.log('currentTarget:', e.currentTarget.id);
});

// User clicks child inside parent — output?
// target: child          ← where click originated
// currentTarget: parent  ← where listener is attached
```

### Problem 7 — capturing order
```js
document.getElementById('outer').addEventListener('click', () => console.log('outer'), true);
document.getElementById('middle').addEventListener('click', () => console.log('middle'), true);
document.getElementById('inner').addEventListener('click', () => console.log('inner'), true);

// User clicks inner — output?
// outer → middle → inner  (capturing — top fires first)
```

### Problem 8 — preventDefault vs stopPropagation
```js
document.getElementById('link').addEventListener('click', function(e) {
    e.preventDefault();    // link will NOT navigate
    // propagation still continues — parent handlers still fire
    console.log('link clicked');
});
document.body.addEventListener('click', () => console.log('body'));

// Output?
// link clicked   ← fires
// body           ← also fires (preventDefault did NOT stop bubbling)
// browser does NOT navigate to href
```

---

## 🧠 Quick Revision — Key Rules

1. Every event goes through **3 phases** — Capturing → Target → Bubbling
2. Default `addEventListener` listens in **bubbling phase**
3. Pass `true` or `{ capture: true }` to listen in **capturing phase**
4. **Bubbling** — child fires first, travels UP to parents
5. **Capturing** — outermost parent fires first, travels DOWN to child
6. `event.target` — element actually clicked — **never changes**
7. `event.currentTarget` — element the listener is on — **changes during propagation**
8. `stopPropagation()` — stops bubbling to parents, **same-element handlers still run**
9. `stopImmediatePropagation()` — stops bubbling + **kills all same-element handlers after it**
10. `preventDefault()` — stops browser default action — **does NOT stop propagation**
11. These three (`stopPropagation`, `stopImmediatePropagation`, `preventDefault`) are **completely independent**
12. **Event Delegation** — one listener on parent handles all children via bubbling
13. Use `e.target.closest(selector)` in delegation to find the right child
14. Delegation automatically handles **dynamically added elements**
15. `removeEventListener` requires the **exact same function reference** — anonymous functions cannot be removed

---

*📅 Revised: March 2026 | Part of daily JS revision series*
