// Campaign generator (not shipped). Run: node gen.js, then paste the LEVELS line into index.html.
// Every level: doing nothing never wins, the shortest win is exactly `par`, and each special
// villager kind matters (treating it as a plain villager changes the par).
// Ranks candidates by fewest shortest solutions (fewer ways to win = more of a puzzle).
const { step, isWin, idleWins, solve, rng, randomLevel } = require('./test.js');

// Layered BFS with path counts: number of distinct shortest pin sequences, or 0.
function countWins(board, types, turns) {
  const pins = [...board].map((_, i) => i).filter(i => types[i] !== 'S' && types[i] !== 'T');
  let layer = new Map([[board, 1]]);
  const seen = new Set([board]);
  for (let t = 1; t <= turns; t++) {
    const next = new Map();
    let wins = 0;
    for (const [b, c] of layer)
      for (const p of pins) {
        const nb = step(b, p, types);
        if (isWin(nb, types)) wins += c;
        else if (!seen.has(nb) || next.has(nb)) next.set(nb, (next.get(nb) || 0) + c);
      }
    if (wins) return wins;
    for (const b of next.keys()) seen.add(b);
    layer = next;
  }
  return 0;
}

function mechanicsMatter(board, types, par) {
  return [...new Set(types.replace(/[.ST]/g, ''))].every(k => {
    const s = solve(board, par + 1, types.split(k).join('.'));
    return !s || s.length !== par;
  });
}

const CAMPAIGN = [
  // [chapter, name, spec or fixed board, turn limit slack]
  ['Hat Trick', 'First Pin', { fixed: ['.........', 'rBrrBrBBB'], par: 2 }, 0],
  ['Hat Trick', 'Change of Heart', { fixed: ['.........', 'BBBrBrBrB'], par: 2 }, 0],
  ['Hat Trick', 'Even Split', { fixed: ['.........', 'BBrBrBrrB'], par: 3 }, 0],
  ['Hat Trick', 'Market Square', { n: 4, par: 3 }, 1],
  ['Into the Woods', 'Clearing', { n: 4, par: 2, kinds: { T: 3 } }, 1],
  ['Into the Woods', 'Orchard', { n: 5, par: 3, kinds: { T: 6 } }, 1],
  ['Stone Cold', 'Old Statue', { n: 4, par: 3, kinds: { S: 2 } }, 1],
  ['Stone Cold', 'Monument Park', { n: 5, par: 3, kinds: { S: 3, T: 2 } }, 1],
  ['Rebels', 'Contrarian', { n: 3, par: 2, kinds: { X: 1 } }, 1],
  ['Rebels', 'Punk Rock', { n: 4, par: 3, kinds: { X: 2 } }, 1],
  ['Rebels', 'Riot in the Pines', { n: 5, par: 4, kinds: { X: 2, T: 3 } }, 1],
  ['Loudmouths', 'Megaphone', { n: 4, par: 3, kinds: { L: 1 } }, 1],
  ['Loudmouths', 'Town Crier', { n: 5, par: 3, kinds: { L: 2, S: 1 } }, 1],
  ['Gossips', 'Over the Fence', { n: 4, par: 3, kinds: { G: 2 } }, 1],
  ['Gossips', 'Grapevine', { n: 5, par: 4, kinds: { G: 2, X: 1, T: 2 } }, 1],
  ['Finale', 'Peer Pressure', { n: 5, par: 4, kinds: { X: 1, L: 1, G: 1, S: 1, T: 2 }, tries: 5000 }, 1],
];

const rand = rng(2026);
const show = (s, n) => s.match(new RegExp(`.{${n}}`, 'g')).join(' / ');
const levels = [];
for (const [chapter, name, spec, slack] of CAMPAIGN) {
  const t0 = Date.now();
  let pick;
  if (spec.fixed) {
    const [types, board] = spec.fixed;
    pick = { types, board, count: countWins(board, types, spec.par) };
  } else {
    const found = [];
    for (let k = 0; k < (spec.tries || (spec.n === 5 ? 500 : 1500)); k++) {
      const { types, board } = randomLevel(spec, rand);
      if (isWin(board, types) || idleWins(board, types)) continue;
      const s = solve(board, spec.par, types);
      if (!s || s.length !== spec.par || !mechanicsMatter(board, types, spec.par)) continue;
      if (levels.some(l => l[2] === board)) continue;
      found.push({ types, board, count: countWins(board, types, spec.par), distinct: new Set(s).size });
    }
    // fewest ways to win, then most varied solution (pinning one cell every turn is dull)
    found.sort((a, b) => a.count - b.count || b.distinct - a.distinct || (a.board < b.board ? -1 : 1));
    pick = found[0];
    if (!pick) throw new Error(`${name}: no board found`);
    pick.candidates = found.length;
  }
  const { types, board } = pick, n = Math.sqrt(board.length);
  // Re-check the shipped guarantees independently of the search above.
  const best = solve(board, spec.par, types);
  if (!best || best.length !== spec.par || solve(board, spec.par - 1, types) || idleWins(board, types)) throw new Error(`${name}: check failed`);
  levels.push([chapter, name, types, board, spec.par, spec.par + slack]);
  console.log(`${levels.length}. ${name} (${chapter}) ${n}x${n} par ${spec.par} limit ${spec.par + slack}  [${pick.count} shortest wins, ${pick.candidates ?? 'fixed'} candidates, ${Date.now() - t0}ms]`);
  console.log(`   types  ${show(types, n)}\n   board  ${show(board, n)}`);
  console.log(`   e.g. pins (row,col): ${best.map(p => `(${(p / n) | 0},${p % n})`).join(' -> ')}`);
}
console.log('\nconst LEVELS = ' + JSON.stringify(levels) + ';');
