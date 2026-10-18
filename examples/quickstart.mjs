import { parseRanges, rangeToIndexes, everyN } from '../scripts/ranges.mjs';

const ranges = parseRanges('1-3, 5, 8-', 10);
console.log('ranges  ', JSON.stringify(ranges));                 // order and duplicates are kept
console.log('indexes ', JSON.stringify(ranges.flatMap(rangeToIndexes)));
console.log('every 4 ', JSON.stringify(everyN(10, 4)));
console.log('repeat  ', JSON.stringify(parseRanges('2,2,1', 5))); // asked twice, delivered twice

for (const bad of ['1,,2', '0-3', '4-2', '1-99', 'abc']) {
  try { parseRanges(bad, 10); } catch (e) { console.log('reject  ', JSON.stringify(bad), '->', e.name + ':', e.message); }
}
