# 📘 JavaScript — Strings Revision Notes

> **Topics Covered:** String Basics · Traversal · String Methods · Interview Q&A · Code Problems

---

## 1. 🔤 What is a String?

A **String** is a sequence of characters used to represent text. In JavaScript, strings are **primitive** and **immutable** — meaning once created, the original string cannot be changed. All string methods return a **new string**.

```js
let str1 = "Hello";          // double quotes
let str2 = 'World';          // single quotes
let str3 = `Hello World`;    // template literal (backtick)
```

### String Length
```js
let str = "Hello";
console.log(str.length); // 5
```

### Accessing Characters
```js
let str = "Hello";
console.log(str[0]);        // "H"
console.log(str.charAt(1)); // "e"
```

---

## 2. 🔁 Traversing / Iterating a String

### Method 1 — Using Index (`for` loop)
```js
let str = "Hello";
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}
```

### Method 2 — `for...of` loop
```js
let str = "Hello";
for (let char of str) {
  console.log(char);
}
```

### Method 3 — `for...of` with Index using `entries()`
```js
let str = "Hello";
for (let [i, char] of str) {
  console.log(i, char);
}
```

---

## 3. 🛠️ String Methods

### a) `charAt(index)`
Returns the character at the given index. Returns `""` if index is out of bounds.

```js
let str = "Hello";
console.log(str.charAt(0));  // "H"
console.log(str.charAt(1));  // "e"
console.log(str.charAt(10)); // ""  ← out of bounds
```

---

### b) `charCodeAt(index)`
Returns the **ASCII / UTF-16 code** of the character at the given index.

```js
console.log("A".charCodeAt(0)); // 65
console.log("a".charCodeAt(0)); // 97
console.log("0".charCodeAt(0)); // 48
```

> 💡 Useful for comparing characters, checking case, encoding, etc.

---

### c) `indexOf(searchValue, startIndex?)`
Returns the **index** of the first occurrence of the search value. Returns `-1` if not found. `startIndex` is optional.

```js
let str = "Hello World";
console.log(str.indexOf("o"));     // 4
console.log(str.indexOf("o", 5));  // 7  ← search starts from index 5
console.log(str.indexOf("xyz"));   // -1 ← not found
```

---

### d) `includes(searchValue, startIndex?)`
Returns `true` or `false` — whether the string contains the search value.

```js
let str = "Hello World";
console.log(str.includes("World")); // true
console.log(str.includes("world")); // false ← case-sensitive
console.log(str.includes("xyz"));   // false
```

---

### e) `toUpperCase()` / `toLowerCase()`
Converts the string to upper or lower case. Returns a **new string**.

```js
let str = "Hello World";
console.log(str.toUpperCase()); // "HELLO WORLD"
console.log(str.toLowerCase()); // "hello world"
console.log(str);               // "Hello World" ← original unchanged
```

---

### f) `substring(start, end)`
Extracts characters from `start` up to (but not including) `end`. If `end` is omitted, extracts to the end of the string.

```js
let str = "Hello World";
console.log(str.substring(0, 5)); // "Hello"
console.log(str.substring(6));    // "World"
console.log(str.substring(2, 8)); // "llo Wo"
```

---

### g) `trim()` / `trimStart()` / `trimEnd()`
Removes whitespace from the string edges.

```js
let str = "   Hello World   ";
console.log(str.trim());      // "Hello World"
console.log(str.trimStart()); // "Hello World   "
console.log(str.trimEnd());   // "   Hello World"
```

---

### h) `split(separator)`
Splits a string into an **array** based on the separator.

```js
let str = "Hello World";
console.log(str.split(" "));  // ["Hello", "World"]
console.log(str.split(""));   // ["H","e","l","l","o"," ","W","o","r","l","d"]
console.log(str.split("l"));  // ["He", "", "o Wor", "d"]
```

---

### i) `replace(searchValue, newValue)`
Replaces the **first** occurrence of `searchValue` with `newValue`.

```js
let str = "Hello World World";
console.log(str.replace("World", "JS")); // "Hello JS World"
```

> Use `replaceAll()` to replace **all** occurrences:
```js
console.log(str.replaceAll("World", "JS")); // "Hello JS JS"
```

---

### j) `slice(start, end?)`
Similar to `substring`, but supports **negative indices**.

```js
let str = "Hello World";
console.log(str.slice(0, 5));  // "Hello"
console.log(str.slice(-5));    // "World"  ← negative index from end
console.log(str.slice(6, -1)); // "Worl"
```

---

### k) `startsWith()` / `endsWith()`
Checks if the string starts or ends with a given value. Returns `true` / `false`.

```js
let str = "Hello World";
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("World"));   // true
console.log(str.startsWith("World")); // false
```

---

### l) `repeat(count)`
Returns the string repeated `count` times.

```js
let str = "Ha";
console.log(str.repeat(3)); // "HaHaHa"
```

---

### 📋 Quick Reference Table

| Method | Returns | Purpose |
|--------|---------|---------|
| `charAt(i)` | Character | Char at index `i` |
| `charCodeAt(i)` | Number | ASCII code at index `i` |
| `indexOf(val)` | Number / `-1` | First index of value |
| `includes(val)` | Boolean | Does string contain value? |
| `toUpperCase()` | String | Converts to uppercase |
| `toLowerCase()` | String | Converts to lowercase |
| `substring(s, e)` | String | Extracts portion |
| `slice(s, e)` | String | Extracts (supports negatives) |
| `trim()` | String | Removes whitespace |
| `split(sep)` | Array | Splits into array |
| `replace(s, r)` | String | Replaces first match |
| `replaceAll(s, r)` | String | Replaces all matches |
| `startsWith(val)` | Boolean | Starts with value? |
| `endsWith(val)` | Boolean | Ends with value? |
| `repeat(n)` | String | Repeats string `n` times |

---

## 🎯 Interview Questions

**Q1. Are strings mutable in JavaScript?**  
No. Strings in JavaScript are **immutable**. You cannot change a character directly like `str[0] = "h"`. All string methods return a new string without modifying the original.

```js
let str = "Hello";
str[0] = "h";
console.log(str); // "Hello" — unchanged
```

**Q2. What is the difference between `slice()` and `substring()`?**  
Both extract a portion of a string, but `slice()` supports **negative indices** (counted from the end), while `substring()` treats negative values as `0`. `slice()` is generally preferred.

```js
let str = "Hello World";
console.log(str.slice(-5));      // "World"
console.log(str.substring(-5));  // "Hello World" ← treats -5 as 0
```

**Q3. What is the difference between `indexOf()` and `includes()`?**  
`indexOf()` returns the position of the match (or `-1`). `includes()` returns a boolean. Use `includes()` for existence checks, `indexOf()` when you need the position.

**Q4. How do you check if a string contains only digits?**
```js
function isNumeric(str) {
  return /^\d+$/.test(str);
}
console.log(isNumeric("12345")); // true
console.log(isNumeric("123a5")); // false
```

**Q5. What does `split("")` do?**  
It splits the string into an array of **individual characters**. This is very useful for reversing strings or processing characters one by one.

```js
"Hello".split(""); // ["H", "e", "l", "l", "o"]
```

**Q6. How is `charCodeAt()` useful in real scenarios?**  
It's used to check if a character is uppercase (`65–90`), lowercase (`97–122`), or a digit (`48–57`) without using regex. Also useful for Caesar cipher-type problems.

**Q7. What is the output of `"5" + 3` vs `"5" - 3`?**  
`"5" + 3` → `"53"` (string concatenation due to `+`). `"5" - 3` → `2` (JS coerces string to number for `-`). This is a classic JS type coercion trap.

---

## 💻 Code Problems — Practice These!

### Problem 1 — Reverse a String
```js
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("hello")); // "olleh"
```

---

### Problem 2 — Check Palindrome
```js
function isPalindrome(str) {
  let cleaned = str.toLowerCase().trim();
  return cleaned === cleaned.split("").reverse().join("");
}
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
```

---

### Problem 3 — Count Vowels
```js
function countVowels(str) {
  let count = 0;
  for (let char of str.toLowerCase()) {
    if ("aeiou".includes(char)) count++;
  }
  return count;
}
console.log(countVowels("Hello World")); // 3
```

---

### Problem 4 — Capitalize First Letter of Each Word
```js
function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
console.log(capitalizeWords("hello world from js")); // "Hello World From Js"
```

---

### Problem 5 — Count Occurrences of a Character
```js
function countOccurrences(str, char) {
  let count = 0;
  for (let c of str) {
    if (c === char) count++;
  }
  return count;
}
console.log(countOccurrences("hello world", "l")); // 3
```

---

### Problem 6 — Find the Longest Word in a String
```js
function longestWord(str) {
  let words = str.split(" ");
  let longest = "";
  for (let word of words) {
    if (word.length > longest.length) longest = word;
  }
  return longest;
}
console.log(longestWord("The quick brown fox")); // "quick"
```

---

### Problem 7 — Remove Duplicate Characters
```js
function removeDuplicates(str) {
  return [...new Set(str)].join("");
}
console.log(removeDuplicates("programming")); // "progamin"
```

---

### Problem 8 — Caesar Cipher (Shift by N)
```js
function caesarCipher(str, shift) {
  return str
    .split("")
    .map(char => {
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      return char;
    })
    .join("");
}
console.log(caesarCipher("hello", 3)); // "khoor"
```

---

### Problem 9 — Check if Two Strings are Anagrams
```js
function isAnagram(str1, str2) {
  let sort = str => str.toLowerCase().split("").sort().join("");
  return sort(str1) === sort(str2);
}
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
```

---

### Problem 10 — Truncate a String
```js
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + "...";
}
console.log(truncate("Hello World", 5)); // "Hello..."
```

---

*📅 Revised: March 2026 | Part of daily JS revision series*