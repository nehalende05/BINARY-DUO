// Run: node test.js — loads the rules straight from index.html so there is one source.
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const src = html.match(/<script id="rules">([\s\S]*?)<\/script>/)[1];
const api = new Function(src + 'return { votes, step, isWin, tied, solve, idleWins, rng, randomLevel, generate };')();
module.exports = api;
if (require.main !== module) return;
const { votes, step, isWin, tied, solve, idleWins, rng, generate } = api;

// plain villagers: majority, tie keeps colour, pin holds for one turn
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

// rebel: does the opposite of the majority, so a rebel among blues turns red
assert.strictEqual(step('BBBBBBBBB', -1, '....X....'), 'BBBBrBBBB');
assert.strictEqual(step('BBBBrBBBB', -1, '....X....'), 'BBBBrBBBB', 'stays red while the crowd is blue');
assert.strictEqual(step('BrrrBrrrB', -1, '....X....')[4], 'B', 'red majority makes a rebel blue');
assert.strictEqual(step('BBBBrBBBB', 4, '....X....')[4], 'r', 'pinned rebel holds');
// loudmouth: vote counts double (corner 0 hears red loudmouth x2 vs one blue)
assert.strictEqual(step('BrBBBBBBB', -1, '.L.......')[0], 'r');
assert.strictEqual(step('BrBBBBBBB', -1)[0], 'B', 'same board without the loudmouth is a tie');
// gossip: hears diagonals too
assert.deepStrictEqual(votes('BrBBrBBBB', 0, 'G........'), [1, 2]);
assert.strictEqual(step('BrBBrBBBB', -1, 'G........')[0], 'r');
assert.strictEqual(step('BrBBrBBBB', -1)[0], 'B', 'plain villager only hears the 1-1 tie');
// statue: never changes, still votes, not needed for the win
assert.strictEqual(step('rBBBBBBBB', -1, 'S........')[0], 'r');
assert.strictEqual(step('rBBBBBBBB', -1, 'S........')[1], 'B');
assert.deepStrictEqual(votes('rBBBBBBBB', 1, 'S........'), [2, 1]);
assert(isWin('rBBBBBBBB', 'S........'));
assert(!isWin('rBBBBBBBB'));
// tree: no vote, no colour, never pinned
assert.deepStrictEqual(votes('-BrBBBBBB', 1, 'T........'), [1, 1]);
assert.strictEqual(step('-BrBBBBBB', -1, 'T........')[0], '-');
assert(isWin('-BBBBBBBB', 'T........'));
const s = solve('rBrrBrBBB', 3, 'S.S......'); // statues in the corners can't be pinned
assert(s && s.every(p => p !== 0 && p !== 2));

// generator: same seed, same village; result meets its spec
const spec = { n: 4, par: 3, kinds: { X: 1, T: 2 } };
const a = generate(spec, rng(42)), b = generate(spec, rng(42));
assert.deepStrictEqual(a, b, 'seeded generation is deterministic');
assert.strictEqual(solve(a.board, 3, a.types).length, 3);
assert(!solve(a.board, 2, a.types) && !idleWins(a.board, a.types));
assert.strictEqual(a.types.split('X').length - 1, 1);
console.log('all tests passed');
