# JavaScript Interview Prep

A curated collection of JavaScript interview questions, problems, and solutions designed to help you prepare for technical interviews. Problems are organized by topic and difficulty, with clear explanations, time/space complexity, and runnable example code.

## Table of Contents
- [About](#about)
- [What's inside](#whats-inside)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [How to use this repo](#how-to-use-this-repo)
- [Folder structure](#folder-structure)
- [Contributing](#contributing)
- [Code style & guidelines](#code-style--guidelines)
- [Running tests](#running-tests)
- [License](#license)
- [Contact](#contact)

## About
This repository is aimed at developers preparing for JavaScript-focused coding interviews. Each problem entry includes:
- Problem statement (with source if applicable)
- One or more solution implementations (idiomatic JavaScript / Node.js)
- Written explanation of the approach
- Time and space complexity analysis
- Unit tests or example usage where available

## What's inside
Typical topics covered:
- JavaScript fundamentals (closures, scopes, prototypes)
- Arrays & Strings
- Linked lists, stacks & queues
- Trees & Graphs
- Sorting & searching
- Dynamic programming
- Two-pointers & sliding window
- Hash maps & sets
- Recursion & backtracking
- Bit manipulation
- Asynchronous JavaScript patterns (Promises, async/await)
- System design and behavioral tips (notes and resources)

Problems are tagged by difficulty (easy / medium / hard) and by topic.

## Prerequisites
- Node.js (recommended v14+ or v16+)
- npm (optional; only needed if tests or utilities require it)

## Getting started
1. Clone the repo:
   git clone https://github.com/rydhammahajan/javascript-interview-prep.git
2. Enter the project directory:
   cd javascript-interview-prep
3. Run a solution file with Node.js, for example:
   node problems/arrays/two-sum/example.js
4. If the project includes a package.json and tests:
   npm install
   npm test

(Adjust paths and commands depending on actual folder layout.)

## How to use this repo
- Browse problems by folder or the index (if present).
- Read the problem statement first, try solving it on your own, then compare with the provided solutions.
- Use the unit tests (if included) to validate and benchmark your solutions.
- Use this repo for timed practice: set a timer, attempt a problem, then review and refactor.

## Folder structure
A suggested structure (actual structure in the repo may vary):
- problems/
  - arrays/
    - two-sum/
      - README.md (problem statement)
      - solution.js
      - solution.test.js
  - linked-lists/
  - trees/
  - dynamic-programming/
- utils/ (helper utilities or reusable snippets)
- notes/ (design and behavioral interview notes)

If your repo uses a different structure, adapt these instructions accordingly.

## Contributing
Contributions are welcome! To add a new problem or improve an existing one:
1. Fork the repository.
2. Create a new branch: git checkout -b feature/add-<problem-name>
3. Add your problem folder under `problems/<topic>/<problem-name>/` with:
   - README.md — problem statement and source link
   - solution.js — solution(s) with clear function export
   - explanation.md or in-file comments — approach and complexity
   - solution.test.js — unit tests (optional but encouraged)
4. Follow code style and include tests where possible.
5. Open a pull request with a clear description of changes.

Naming conventions:
- Use kebab-case for file/folder names (e.g., two-sum).
- Include difficulty in the problem README or filename if helpful.

## Code style & guidelines
- Write solutions using clear, readable JavaScript (ES6+).
- Prefer pure functions for algorithm solutions.
- Document assumptions and edge cases.
- Add comments to explain non-obvious logic.
- Keep time/space complexity analysis concise and accurate.

## Running tests
If the repository includes tests (Jest, Mocha, etc.), run:
- npm install
- npm test

If there are no test scripts, run individual solution files with node:
- node path/to/solution.js

## License
This project is provided under the MIT License. See LICENSE for details. (If you prefer a different license, update this file accordingly.)

## Contact
Maintainer: rydhammahajan  
Repository: https://github.com/rydhammahajan/javascript-interview-prep

Contributions, suggestions, and improvements are appreciated—open an issue or a pull request.

## Acknowledgements & Resources
- LeetCode, HackerRank, Educative, Cracking the Coding Interview
- JavaScript language references and style guides
