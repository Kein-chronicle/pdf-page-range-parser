---
name: page-range-parser
description: Parse bounded page selections without silently sorting or deduplicating them. Use when splitting or reordering paginated documents.
---

# page-range-parser

Parse bounded page selections without silently sorting or deduplicating them.

## Workflow

1. Confirm the input contract and exclusions below before transforming user data.
2. Import the named exports from `scripts/ranges.mjs`. Node.js 22+; no npm dependencies. Browser use requires a modern ES module runtime.
3. Run `node --test tests/run.mjs` from this skill folder. The tests contain concrete inputs, expected outputs and rejection cases.
4. Integrate the pure function into the caller. Surface thrown errors as an invalid input result; do not replace failure with empty success.
5. Preserve the original data and inspect a representative output before adding writes or exports.

## Contract and limits

Inputs are 1-based inclusive page ranges; outputs are pairs or 0-based indexes. Duplicate selections intentionally duplicate pages. No PDF parser is included.

## Verification

Run `node --test tests/run.mjs` after copying this folder into an agent's skill directory. Keep `scripts/` and `tests/` together; there are no references to a private source repository. The assertions in `tests/run.mjs` are executable usage examples.
