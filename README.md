<div align="center">

# 🎩 Peer Pressure

### *Everyone copies their neighbours. You choose who refuses.*

A tiny puzzle game about hats, crowds, and one very stubborn villager.

**🔵 Turn everyone blue before you run out of turns. 🔴**

![Platform](https://img.shields.io/badge/play%20in-any%20browser-4c8bf5?style=for-the-badge)
![Install](https://img.shields.io/badge/install-nothing-2ea44f?style=for-the-badge)
![Offline](https://img.shields.io/badge/works-offline-orange?style=for-the-badge)
![Levels](https://img.shields.io/badge/campaign-16%20levels-8957e5?style=for-the-badge)

</div>

---

## 🚀 Play in 10 seconds

1. Open **`index.html`** in any browser.
2. That's it. No install, no internet needed.

---

## 🎯 The goal

> **Turn everyone blue in N turns.**

The goal is always shown above the board, and **N** is that level's turn limit.

---

## 🔁 How a turn works

Every turn has the same four beats:

| Step | What happens |
|:---:|---|
| 📌 **1** | **Pin one villager** by clicking or tapping them. A pinned villager keeps their hat colour this turn, no matter what. |
| 👥 **2** | **Everyone else updates at the same time.** Each villager looks at their neighbours (up, down, left, right) and copies the **majority** colour. |
| ⚖️ **3** | **A tie keeps the current colour.** Villagers in a tie show a yellow **`=`** badge before you move. |
| ⏱️ **4** | **The pin lasts one turn.** Next turn they follow the crowd again, unless you pin them again. |

> ⚠️ Every turn needs a pin. You can't pass.

### 🧪 Worked example: level 1

```
r B r        Pin the top-middle B.        r B r        Pin it again.        B B B
r B r   →    The two middle reds see  →   B B B   →    The top corners  →   B B B
B B B        2 blues and turn blue.       B B B        now see 2 blues.     B B B
```

*(`B` = blue, `r` = red)*

💡 **Why the pin matters:** if you don't pin the top-middle villager, they see two reds beside them, turn red, and the board never recovers.

---

## 🏘️ Meet the village

Every special kind of villager gets an intro card the first time it appears. Tap its chip under the board to see the card again.

| | Kind | Looks like | The rule |
|:---:|---|---|---|
| 🙂 | **Villager** | Plain shirt | Copies the majority of their 4 neighbours. A tie keeps their colour. |
| 🌳 | **Tree** | A tree | Nobody lives here. Trees don't vote and can't be pinned. |
| 🗿 | **Statue** | Grey stone on a pedestal | Never changes, but **still votes**. Statues don't need to turn blue, and can't be pinned. |
| 😎 | **Rebel** | Sunglasses, leather jacket | Does the **opposite** of the majority. A tie still keeps their colour. A rebel surrounded by blue turns red. |
| 📣 | **Loudmouth** | Open mouth, purple shirt | Their vote counts **double** for their neighbours. |
| 🤓 | **Gossip** | Round glasses, green cardigan | Also listens to the 4 **diagonal** neighbours, so they hear up to **8** votes. |

> ♿ **Colour-blind friendly:** blue villagers wear a **round cap** and red ones wear a **pointy hat**, so you can tell them apart without relying on colour.

---

## 🏆 Winning and losing

### ✅ You win

The moment **every villager is blue** after a turn, within the turn limit.

- 🗿 **Statues don't count.** A red statue can stay red.
- 🌳 **Trees don't count.** Nobody lives there.

The win screen shows your stars, then offers:

- **Next level** (or **Share result** in Daily, **Next village** in Endless)
- **Watch best solution** to replay the shortest way to win
- **Retry for 3 stars** if you missed one

### ❌ You lose

You've used every turn and someone who needs to be blue is still red. The board stays visible behind the **"Out of turns"** card so you can see how close you got. From there:

- 🔄 **Try again** (or press `R`) restarts the level.
- ↩️ **Undo last turn** (or press `Z`) takes back your last move so you can try something different.

---

## ⭐ Stars

Each level gives up to **3 stars**:

| Star | How to earn it |
|:---:|---|
| ⭐ **Clear** | Win within the turn limit. |
| ⭐ **Par** | Win in **par** turns or fewer. Par is the shortest possible win, proven by the solver. |
| ⭐ **No hint** | Win without pressing Hint. *(The free hint ring on level 1 doesn't count.)* |

📌 **Good to know:**

- From **level 4 on**, the turn limit is **par + 1**. You can still win after one wasted turn, but only a perfect run earns all 3 stars.
- Star goals sit under the turn counter and get **crossed out** as soon as you can no longer earn them.

---

## 🎮 Game modes

| Mode | What it is | Win | Lose |
|---|---|---|---|
| 🗺️ **Campaign** | 16 hand-checked levels in 6 chapters, each adding one new kind of villager. | Clear a level to unlock the next. | Out of turns: retry or undo as often as you like. |
| 📅 **Daily village** | One new 5×5 village per day, the **same for everyone** on that date. | Clear it, then **Share result** copies an emoji card of the village and your stars. | Out of turns: retry as often as you like. Your best stars for the day are kept. |
| ♾️ **Endless** | Random villages that grow from 3×3 to 5×5 and get more special villagers. | Each clear adds **1 to your streak**. Your best streak is saved. | **Out of turns ends the streak.** Undo and restart are locked once you've lost, so start a new run. |

🔬 **Campaign levels are solver-verified.** Doing nothing never wins, the shortest win is exactly par, and each level's special villagers matter: treat them as plain villagers and the par changes.

### 📖 Campaign chapters

| Chapter | New villager |
|---|---|
| 1. Hat Trick | The basics |
| 2. Into the Woods | 🌳 Trees |
| 3. Stone Cold | 🗿 Statues |
| 4. Rebels | 😎 Rebels |
| 5. Loudmouths | 📣 Loudmouths |
| 6. Gossips | 🤓 Gossips |
| 🏁 Finale | Everything at once |

---

## ⌨️ Controls

| Action | 🖱️ Mouse | 📱 Touch | ⌨️ Keyboard |
|---|---|---|---|
| **Preview** who would flip | Hover a villager | Tap once | Move focus with arrow keys |
| **Pin** | Click | Tap the same villager again | `Enter` or `Space` |
| **Undo** | Undo button | Undo button | `Z` |
| **Restart** | Restart button | Restart button | `R` |
| **Hint** *(costs the No hint star)* | Hint button | Hint button | `H` |
| **Close a card** | Got it | Got it | `Esc` |

👀 **About the preview:** a small picture appears in the corner of every villager who would change, so you can see their next look *before* you commit.

💾 **Progress is saved** in this browser.

---

## 🤫 Solutions (spoilers!)

<details>
<summary><b>Click to reveal the shortest solution for every campaign level</b></summary>

<br>

Positions are **row `r`, column `c`**, counted from the **top-left**, starting at **1**.

| # | Chapter | Level | Size | Par | Limit | Pins |
|:-:|---|---|:-:|:-:|:-:|---|
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

Every level except **3** has exactly one shortest solution. Level 3 has two that mirror each other.

</details>

---

## 🛠️ For developers

|
