# Peer Pressure: rules and win states

**Everyone copies their neighbours. You choose who refuses.**

Open `index.html` in any browser. There is nothing to install, and it works offline.

## The goal

> Turn everyone blue in N turns.

The goal is always shown above the board. N is the level's turn limit.

## A turn

1. **Pin one villager** by clicking or tapping them. A pinned villager keeps their hat colour this turn, no matter what.
2. **Everyone else updates at the same time.** Each villager looks at their neighbours (up, down, left and right) and copies the **majority** colour.
3. **A tie keeps the current colour.** Villagers in a tie show a yellow `=` badge before you move.
4. **The pin lasts one turn.** Next turn, that villager follows the crowd again unless you pin them again.

Every turn needs a pin. You can't pass.

### Example: level 1

```
r B r        Pin the top-middle B.        r B r        Pin it again.        B B B
r B r   →    The two middle reds see  →   B B B   →    The top corners  →   B B B
B B B        2 blues and turn blue.       B B B        now see 2 blues.     B B B
```

If you don't pin the top-middle villager, they see two reds beside them, turn red, and the board never recovers.

## Who lives in the village

Every special kind is introduced with a card the first time it appears. Tap its chip under the board to see the card again.

| Kind | Looks like | Rule |
|---|---|---|
| **Villager** | Plain shirt | Copies the majority of their 4 neighbours. A tie keeps their colour. |
| **Tree** | A tree | Nobody lives here. Trees don't vote and can't be pinned. |
| **Statue** | Grey stone on a pedestal | Never changes, but still votes. Statues don't need to turn blue, and can't be pinned. |
| **Rebel** | Sunglasses, leather jacket | Does the **opposite** of the majority. A tie still keeps their colour. A rebel surrounded by blue turns red. |
| **Loudmouth** | Open mouth, purple shirt | Their vote counts **double** for their neighbours. |
| **Gossip** | Round glasses, green cardigan | Also listens to the 4 **diagonal** neighbours, so they hear up to 8 votes. |

Blue villagers wear a round cap and red ones wear a pointy hat, so you can tell them apart without relying on colour.

## Win state

You **win** the moment every villager is blue after a turn, within the turn limit.
- Statues don't count. A red statue can stay red.
- Trees don't count, because nobody lives there.

The win screen shows your stars, then **Next level** (or **Share result** in Daily, **Next village** in Endless). It also offers **Watch best solution**, which replays the shortest way to win, and **Retry for 3 stars** if you missed one.

## Lose state

You **lose** when you have used every turn and anyone who needs to be blue is still red. The board stays visible behind the "Out of turns" card so you can see how close you got. From there you can:
- **Try again** (or press `R`) to restart the level.
- **Undo last turn** (or press `Z`) to take back your last move and try a different one.

## Stars

Each level gives up to 3 stars:

| Star | How to earn it |
|---|---|
| ★ Clear | Win within the turn limit. |
| ★ Par | Win in **par** turns or fewer. Par is the shortest possible win, proven by the solver. |
| ★ No hint | Win without pressing Hint. The free hint ring on level 1 doesn't count. |

From level 4 on, the turn limit is par + 1, so you can still win after one wasted turn, but only a perfect run gets all 3 stars. The star goals are shown under the turn counter and get crossed out as soon as you can no longer earn them.

## Modes

| Mode | What it is | Win | Lose |
|---|---|---|---|
| **Campaign** | 16 hand-checked levels in 6 chapters, each adding one new kind of villager. | Clear a level to unlock the next. | Out of turns: retry or undo as often as you like. |
| **Daily village** | One new 5×5 village per day, the same for everyone on that date. | Clear it, then **Share result** copies an emoji card of the village and your stars. | Out of turns: retry as often as you like. Your best stars for the day are kept. |
| **Endless** | Random villages that grow from 3×3 to 5×5 and get more special villagers. | Each clear adds 1 to your streak. Your best streak is saved. | **Out of turns ends the streak.** Undo and restart are locked once you have lost, so start a new run. |

Every campaign level was generated and checked by a solver. Doing nothing never wins, the shortest win is exactly par, and each level's special villagers matter: treat them as plain villagers and the par changes.

## Controls

| Action | Mouse | Touch | Keyboard |
|---|---|---|---|
| Preview who would flip | Hover a villager | Tap once | Move focus with the arrow keys |
| Pin | Click | Tap the same villager again | `Enter` or `Space` |
| Undo | Undo button | Undo button | `Z` |
| Restart | Restart button | Restart button | `R` |
| Hint (costs the No hint star) | Hint button | Hint button | `H` |
| Close a card | Got it | Got it | `Esc` |

The preview shows a small picture in the corner of every villager who would change, so you can see their next look before you commit. Progress is saved in this browser.

## Solutions (spoilers)

<details>
<summary>Shortest solution for every campaign level (row r, column c, counted from the top-left, starting at 1)</summary>

| # | Chapter | Level | Size | Par | Limit | Pins |
|---|---|---|---|---|---|---|
| 1 | Hat Trick | First Pin | 3×3 | 2 | 2 | r1c2 → r1c2 |
| 2 | Hat Trick | Change of Heart | 3×3 | 2 | 2 | r2c2 → r3c2 |
| 3 | Hat Trick | Even Split | 3×3 | 3 | 3 | r1c2 → r2c2 → r3c2 |
| 4 | Hat Trick | Market Square | 4×4 | 3 | 4 | r3c3 → r4c3 → r3c4 |
| 5 | Into the Woods | Clearing | 4×4 | 2 | 3 | r2c4 → r2c3 |
| 6 | Into the Woods | Orchard | 5×5 | 3 | 4 | r4c1 → r4c2 → r5c2 |
| 7 | Stone Cold | Old Statue | 4×4 | 3 | 4 | r4c3 → r3c2 → r3c1 |
| 8 | Stone Cold | Monument Park | 5×5 | 3 | 4 | r5c1 → r5c4 → r3c5 |
| 9 | Rebels | Contrarian | 3×3 | 2 | 3 | r2c1 → r3c2 |
| 10 | Rebels | Punk Rock | 4×4 | 3 | 4 | r2c2 → r4c4 → r3c2 |
| 11 | Rebels | Riot in the Pines | 5×5 | 4 | 5 | r5c2 → r4c5 → r4c4 → r4c3 |
| 12 | Loudmouths | Megaphone | 4×4 | 3 | 4 | r3c2 → r1c2 → r2c4 |
| 13 | Loudmouths | Town Crier | 5×5 | 3 | 4 | r3c4 → r2c4 → r1c4 |
| 14 | Gossips | Over the Fence | 4×4 | 3 | 4 | r3c4 → r4c2 → r3c2 |
| 15 | Gossips | Grapevine | 5×5 | 4 | 5 | r5c2 → r3c5 → r4c4 → r4c4 |
| 16 | Finale | Peer Pressure | 5×5 | 4 | 5 | r1c5 → r1c3 → r5c2 → r4c2 |

Every level except 3 has exactly one shortest solution. Level 3 has two that mirror each other.
</details>

## For developers

- `node test.js` runs the rule tests. They load the engine straight from `index.html`.
- `node gen.js` regenerates the campaign and prints every level's solution. Paste its `LEVELS` line into `index.html`.
- `python3 gen_assets.py` redraws the placeholder sprites and sounds into the `ASSETS` block. To use your own, replace any entry with a base64 data URI.
- Open `index.html?dev` to check every level on load. Problems are reported in the browser console.
