// Level generator (not shipped). Run: node gen.js
// Keeps boards where doing nothing never wins and the shortest win takes exactly `turns`.
// Ranks by fewest shortest solutions (fewer ways to win = more of a puzzle).
const { step, isWin, idleWins } = require('./test.js');

// Layered BFS with path counts. Returns { depth, count, first } of the shortest win, or null.
function analyse(board, maxTurns) {
  let layer = new Map([[board, 1]]);
  const seen = new Set([board]);
  for (let t = 1; t <= maxTurns; t++) {
    const next = new Map();
    let wins = 0;
    for (const [b, c] of layer)
      for (let p = 0; p < b.length; p++) {
        const nb = step(b, p);
        if (isWin(nb)) wins += c;
        else if (!seen.has(nb) || next.has(nb)) next.set(nb, (next.get(nb) || 0) + c);
      }
    if (wins) return { depth: t, count: wins };
    for (const b of next.keys()) seen.add(b);
    layer = next;
  }
  return null;
}

// All shortest pin sequences (only used on the chosen boards, so brute force is fine).
function solutions(board, turns, path = []) {
  if (path.length === turns) return isWin(board) ? [path] : [];
  if (isWin(board)) return [];
  return [...Array(board.length).keys()].flatMap(p => solutions(step(board, p), turns, [...path, p]));
}

let seed = 1;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const randomBoard = n => Array.from({ length: n * n }, () => (rand() < 0.5 ? 'B' : 'r')).join('');
const allBoards = n => Array.from({ length: 2 ** (n * n) }, (_, k) => [...Array(n * n)].map((_, i) => (k >> i) & 1 ? 'B' : 'r').join(''));

function candidates(n, turns, pool, extra = () => true) {
  const out = [];
  for (const b of new Set(pool)) {
    if (idleWins(b)) continue;
    const a = analyse(b, turns);
    if (a && a.depth === turns && extra(b)) out.push({ board: b, count: a.count });
  }
  return out.sort((x, y) => x.count - y.count || (x.board < y.board ? -1 : 1));
}

const show = (b, n) => b.match(new RegExp(`.{${n}}`, 'g')).join(' / ');
const levels = [];
function pick(name, n, turns, pool, extra) {
  const t0 = Date.now();
  const c = candidates(n, turns, pool, b => !levels.includes(b) && (!extra || extra(b)));
  if (!c.length) throw new Error(`${name}: no board found`);
  const { board, count } = c[0];
  levels.push(board);
  const sols = solutions(board, turns);
  console.log(`${name} ${n}x${n} in ${turns}: ${show(board, n)}  (${c.length} candidates, ${count} winning sequences, ${Date.now() - t0}ms)`);
  for (const s of sols) console.log(`   pins (row,col): ${s.map(p => `(${(p / n) | 0},${p % n})`).join(" -> ")}`);
  return sols;
}

pick('L1', 3, 2, ['rBrrBrBBB']); // the PRD's level 1
// L2: the pin must move between turn 1 and turn 2 in every solution.
pick('L2', 3, 2, allBoards(3), b => solutions(b, 2).every(([a, c]) => a !== c));
pick('L3', 3, 3, allBoards(3));
const pool4 = Array.from({ length: 3000 }, () => randomBoard(4));
pick('L4', 4, 3, pool4);
pick('L5', 4, 3, pool4);
pick('L6', 5, 4, Array.from({ length: 150 }, () => randomBoard(5)));
console.log('\nconst LEVELS = ' + JSON.stringify(levels.map((b, i) => [b, [2, 2, 3, 3, 3, 4][i]])) + ';');
