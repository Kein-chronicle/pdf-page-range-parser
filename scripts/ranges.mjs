const integer = n => Number.isSafeInteger(n) && n > 0 && n <= 1000000;
export function parseRanges(text, total) {
  if (!integer(total)) throw new RangeError('total must be an integer from 1 to 1000000');
  if (typeof text !== 'string' || !text.trim() || text.length > 10000) throw new TypeError('nonempty range text required (max 10000 chars)');
  if (/(^\s*,|,\s*,|,\s*$)/.test(text)) throw new SyntaxError('empty range segment');
  // Pages are separated by commas only. Spaces are allowed around '-' or '~' ("1 - 3") but not between pages ("1 2" is ambiguous and rejected).
  const tokens = text.trim().replace(/\s*([-~])\s*/g, '$1').split(',').map(t => t.trim());
  return tokens.map(token => {
    if (/\s/.test(token)) throw new SyntaxError('missing comma between pages: ' + token);
    const m = /^(\d+)$/.exec(token), r = /^(\d*)[-~](\d*)$/.exec(token);
    if (!m && (!r || (!r[1] && !r[2]))) throw new SyntaxError('invalid range: ' + token);
    const a = Number(m ? m[1] : r[1] || 1), b = Number(m ? m[1] : r[2] || total);
    if (!integer(a) || !integer(b) || b > total) throw new RangeError('range outside document');
    if (a > b) throw new RangeError('reversed range: ' + token);
    return [a,b];
  });
}
export function rangeToIndexes(range) {
  if (!Array.isArray(range) || range.length !== 2 || !range.every(integer) || range[0] > range[1]) throw new RangeError('invalid interval');
  return Array.from({length:range[1]-range[0]+1}, (_,i)=>range[0]-1+i);
}
export function everyN(total,n) {
  if (!integer(total) || !integer(n)) throw new RangeError('positive bounded integers required');
  const out=[]; for(let a=1;a<=total;a+=n) out.push([a,Math.min(total,a+n-1)]); return out;
}
