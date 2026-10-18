import test from 'node:test';
import assert from 'node:assert/strict';

import {parseRanges,rangeToIndexes,everyN} from '../scripts/ranges.mjs';
test('ranges preserve order, overlaps and open endpoints',()=>{
 assert.deepEqual(parseRanges('3, 1 - 2, 4-',5),[[3,3],[1,2],[4,5]]);
 assert.deepEqual(parseRanges('2,2,1',5),[[2,2],[2,2],[1,1]]);
 assert.deepEqual(parseRanges('- 3, 1 -',5),[[1,3],[1,5]]);       // spaces around the dash are fine: '- 3' is '-3' and '1 -' is '1-'
 assert.deepEqual(parseRanges('-2,2~3',5),[[1,2],[2,3]]);
 assert.deepEqual(rangeToIndexes([2,4]),[1,2,3]);
 assert.deepEqual(everyN(5,2),[[1,2],[3,4],[5,5]]);
});
test('reject invalid syntax and allocation abuse',()=>{
 const bad=[['', TypeError], ['-', SyntaxError], ['0', RangeError], ['6', RangeError], ['3-2', /reversed/], ['1,,2', /empty range segment/], ['1.5', SyntaxError], ['NaN', SyntaxError],
  ['1 2', /missing comma/], ['\u0661', SyntaxError], ['1e2', SyntaxError], ['9'.repeat(30), RangeError]];
 for(const [s,err] of bad) assert.throws(()=>parseRanges(s,5), err, JSON.stringify(s));
 for(const n of [0,-1,1.5,Infinity,1000001]) assert.throws(()=>everyN(5,n));
 assert.throws(()=>rangeToIndexes([3,2]));
});
