// Run: node test.js — loads the rules straight from index.html so there is one source.
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const src = html.match(/<script id="rules">([\s\S]*?)<\/script>/)[1];
const { step, isWin, tied, solve, idleWins } = new Function(src + 'return { step, isWin, tied, solve, idleWins };')();
module.exports = { step, isWin, tied, solve, idleWins };
if (require.main !== module) return;

// majority, tie keeps colour, pin holds
assert.strictEqual(step('rBrrBrBBB', -1), 'rrrBBBBBB');
assert.strictEqual(step('rBrrBrBBB', 1), 'rBrBBBBBB');
assert.strictEqual(step('BrB' + 'rrr' + 'BrB', -1), 'rBr' + 'BrB' + 'rBr'); // corners see 2 red, edges see 2 blue vs 1 red
assert.strictEqual(step('BBBBrBBBB', 4), 'BBBBrBBBB'); // pinned cell keeps colour against 4 blues
assert.strictEqual(step(step('BBBBrBBBB', 4), -1), 'BBBBBBBBB'); // pin lasts one turn only
assert.strictEqual(tied('rBrrBrBBB').map(Number).join(''), '101010101');

// PRD level 1
const L1 = 'rBr' + 'rBr' + 'BBB';
assert.strictEqual(idleWins(L1), false, 'doing nothing must never win');
for (let p = 0; p < 9; p++) assert(!isWin(step(L1, p)), `not winnable in 1 turn (pin ${p})`);
assert(isWin(step(step(L1, 1), 1)), 'pin top-middle twice wins');
assert.deepStrictEqual(solve(L1, 1), null);
assert.strictEqual(solve(L1, 2).length, 2);
console.log('all tests passed');
