# pdf-page-range-parser

**Parse "1-3, 5, 8-" page selections into exact ranges without silently sorting or deduplicating, and reject anything ambiguous.**

[![test](https://github.com/Kein-chronicle/pdf-page-range-parser/actions/workflows/test.yml/badge.svg)](https://github.com/Kein-chronicle/pdf-page-range-parser/actions/workflows/test.yml) ![license](https://img.shields.io/badge/license-MIT-blue.svg) ![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

## Why

Print dialogs sort and dedupe your selection. When you are splitting or reordering a document, `2,2,1` means exactly that. This parser keeps order and repeats, supports open-ended ranges, and throws on empty segments and out-of-range pages.

## Install

**As a Claude Code skill** (Claude uses it when the task matches the skill description):

```sh
git clone https://github.com/Kein-chronicle/pdf-page-range-parser.git ~/.claude/skills/page-range-parser
```

For a single project, clone into `<project>/.claude/skills/page-range-parser` instead, then start a new Claude Code session.

**As a library** (Node.js 22+, no dependencies):

```sh
npm install github:Kein-chronicle/pdf-page-range-parser
```

or copy the one file you need: `scripts/ranges.mjs` is self-contained.

**Requires:** Node.js 22+.

## Quick start

Run the quickstart:

```console
$ node examples/quickstart.mjs
ranges   [[1,3],[5,5],[8,10]]
indexes  [0,1,2,4,7,8,9]
every 4  [[1,4],[5,8],[9,10]]
repeat   [[2,2],[2,2],[1,1]]
reject   "1,,2" -> SyntaxError: empty range segment
reject   "0-3" -> RangeError: range outside document
reject   "4-2" -> RangeError: reversed range: 4-2
reject   "1-99" -> RangeError: range outside document
reject   "abc" -> SyntaxError: invalid range: abc
```

The output above is real: it is produced by the files in `examples/`.

## API

```js
import { parseRanges, rangeToIndexes, everyN } from 'pdf-page-range-parser';

parseRanges('1-3, 5, 8-', 10);   // [[1,3],[5,5],[8,10]]  (1-based, inclusive)
rangeToIndexes([8, 10]);         // [7, 8, 9]            (0-based)
everyN(10, 4);                   // [[1,4],[5,8],[9,10]]  split into chunks of 4
```

| Function | Returns / throws |
|---|---|
| `parseRanges(text, total)` | array of `[start, end]`; pages are separated by commas (`1 2` is rejected, spaces around `-` are fine); `SyntaxError` for `1,,2`, `1 2` or `abc`, `RangeError` for `0-3`, `1-99` and reversed ranges such as `4-2`, `TypeError` for empty text |
| `rangeToIndexes([a, b])` | 0-based indexes |
| `everyN(total, n)` | consecutive chunks |

## Limits

- 1-based inclusive pages in, no PDF parsing included.

## More from the same collection

Small, tested tools that grew out of running AI agents and game/app pipelines for months:

- [**pdf-annotation-rotation**](https://github.com/Kein-chronicle/pdf-annotation-rotation): Rotate PDF/canvas annotations (boxes, lines, ink, source masks) a quarter turn in display coordinates, without mutating the input.
- [**pdf-text-position-table-extract**](https://github.com/Kein-chronicle/pdf-text-position-table-extract): Rebuild a rectangular table from positioned text fragments (x, baseline, size, text), keeping empty cells in place.
- [**csv-injection-safe-export**](https://github.com/Kein-chronicle/csv-injection-safe-export): Encode CSV that is safe to open in Excel and Sheets: quoting plus neutralization of formula prefixes (=, +, -, @, tab, CR, LF).

## Development

```sh
node --test tests/run.mjs
```

The tests include inputs that are supposed to be rejected, so a green run also shows the checks can fail. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).

If this saved you a debugging session, a star helps other people find it. Bug reports and failing test cases are even better.

<sub>Keywords: pdf, javascript, esm, parser, page-range, split-pdf, zero-dependencies, claude-skills</sub>
