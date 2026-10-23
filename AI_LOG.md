# AI_LOG.md

How we used AI to build **Peer Pressure**: the tools, the prompts that shaped the game, and the times the AI got it wrong.

## Tools

| Tool | What we used it for |
|---|---|
| **Claude Code** (Claude Opus 5.5) | Wrote the rules engine, tests, solver, level generator, the whole `index.html`, the sprites and sound effects (generated in code), the rules guide and the launch video. |
| **Claude** | Ideation and prior-art check: 15 concepts, before we picked this one (see the AI plan in our PRD). |
| **Playwright** (headless Chromium + WebKit) | The AI played every level through the real UI to test it, took screenshots to check its own design work, and captured the launch video frame by frame. |
| **Python** (Pillow, NumPy) | Generated pixel-art sprites from text pixel maps, and synthesised the 8-bit sound effects and the trailer's chiptune soundtrack. |
| **ffmpeg** | Encoded the launch video. |
| **Google Fonts** | Press Start 2P, embedded in the HTML so the game works offline. |

## Skills used

Claude Code skills, which are packaged instructions the AI loads for a kind of task:

| Skill | Used for |
|---|---|
| `ui-ux-pro-max` | Both redesigns. It produced the design system (Pixel Art style, Press Start 2P, blinking-cursor menus, reduced-motion rules) and the pre-delivery checks for accessibility, touch targets and contrast. |
| `brag` (in its `brag-slim` mode) | The 22-second launch trailer (`brag-output/`), built from the live game. |
| `ponytail` | Active for the whole session: "smallest change that fully solves the task", with a test for any new logic. It kept the game a single file with no dependencies. |
| `superpowers` (`using-superpowers`) | Loaded at session start: check for a relevant skill before acting, and verify before claiming anything works. |

## Key prompts

**1. Build the core game** → rules, solver, levels, playable game

> Read PRD.md in this folder. It is the spec for "Peer Pressure", a single-file browser puzzle game for a hackathon. Build it.
>
> Work in this order and stop after each step to confirm it works:
>
> 1. Rules and tests. Write a pure step(board, pin) function exactly as the PRD describes (up/down/left/right neighbours, majority wins, tie keeps current colour, pinned cell keeps its colour for that turn only). Add assert-based checks, including the PRD's level 1 board (r B r / r B r / B B B): it must be unsolvable in 1 turn, never won by doing nothing, and won in 2 turns by pinning the top-middle cell twice.
>
> 2. Level generator. Write a separate script (not part of the shipped HTML) that brute-forces boards and keeps only those where doing nothing never wins, fewer turns than the limit never wins, and the minimum solution equals the limit. Generate the 6 levels from the PRD level plan (sizes and turn limits as listed). If 5x5 is too slow, use BFS with a visited set. Paste the chosen boards into the game as strings, and print each level's solution so I can check them.
>
> 3. Playable game in one index.html, vanilla JS, no dependencies, no build step. Use plain coloured squares as placeholders for villagers. Include: a one-line goal banner with a turn counter ("Turn everyone blue in N turns"), tap or click to pin, Z to undo, R to restart, H for a hint that uses the solver, a win screen with "Next level", a fail state with instant restart, and a visible cascade animation after each turn. Mark tied cells with a small "=" marker. Make it work at phone width.
>
> 4. Asset slots. Load sprites and sounds from a single ASSETS object of base64 data URIs, with fallbacks to the placeholder squares and silence when an entry is empty. I will generate the real assets myself (PixelLab sprites, jsfxr sound effects, BeepBox music), so list exactly which sprite and sound names the game expects and their sizes. Use image-rendering: pixelated. Start audio only after the first tap and add a mute button.
>
> 5. Polish: screen shake on win, a "turns used / par" badge, a hint ring on level 1 after 8 seconds of no input.
>
> Rules for you: keep it small and simple, do not add features the PRD does not list, and do not claim anything works until you have run it. At the end, open the game, play levels 1 to 3 yourself, and tell me what you tested and what you did not.

**2. First redesign** (`/ui-ux-pro-max`) → modern pixel look, generated sprites

> Heavily improvise the design, Should be modern, https://github.com/Blop77/cyclone-sentinel check story.html and story/ and match the designing, should be playful, pixel game style, Generate and use sprites etc if needed.

**3. Make it win-worthy** → villager types, 16-level campaign, stars, Daily and Endless modes, rules file

> The game's way too simple, it's not hackathon's win-worthy. So yea, need that updated, Go crazy with the idea […] We're on track 4, Open innovation. Also make a rules and winstate file, so I can figure out how to play your new version.

**4. Retro redesign** (`/ui-ux-pro-max`) → animated pixel scenery, parchment RPG UI

> Update the design, make it look like a proper retro pixel game, light theme works too if needed, I don't need a plain background, get me those retro scenery animated background.

**5. Bug report from a screenshot** → board grid fix

> [screenshot] The grid doesn't fit in the brown frame, for all levels, quick fix on it.

**6. Launch video** (`/brag`) → `brag-output/brag.mp4`

> /brag

**7. This log**

> Add this, and a couple more major prompts we used, in a file called AI_LOG.md, and push it to the repo, list all the skills used for creation of the project.

## When AI got it wrong

**The board didn't fit its frame, and the AI had said it was fine.** After the retro redesign, the AI screenshot-tested the game at two window sizes and reported that everything fit. We pasted a screenshot showing the villager grid spilling out of the wooden frame. The AI checked all 16 levels at 8 window sizes in Chromium and WebKit and couldn't reproduce it, so it couldn't confirm the cause. It applied the standard fix for grid overflow: columns changed from `1fr` to `minmax(0, 1fr)`, which can never grow past the frame, and the cells got `min-width: 0`. Lesson: "it fits in my test browser" isn't proof. A human on a real screen caught it.

Other mistakes the AI's own checks caught before we ever saw them:

- **A wrong test.** In the very first step, the AI hand-computed an expected board for a test and got it wrong. Running the tests caught it; the rules code was right, the expectation wasn't.
- **A script that deleted half the game.** The sprite generator rewrote the `ASSETS` block with a regex that, on one input, ran past the end of the block and deleted the level list and the villager definitions. The browser test showed `KINDS is not defined`. The AI tightened the regex so it can only match the asset lines.
- **Hidden mute button.** The win and fail screens covered the mute button. The automated playthrough couldn't click it, which exposed the bug.
- **Back button left the win card open.** It sat on top of the level select. Found while reviewing screenshots and fixed.
- **Blank scenery in the trailer.** Headless Chrome showed streaks instead of the animated village while the video was being captured. The AI compared the canvas's pixels with the screenshot, found the GPU canvas wasn't updating, and switched to software rendering.

## How we checked the AI's work

- `node test.js`: rule tests for every villager type, the PRD's level 1 checks, and generator determinism.
- `node gen.js`: every campaign level is regenerated and re-proven. Doing nothing never wins, the shortest win is exactly par, and each special villager changes the par.
- Automated browser playthroughs (Playwright) of all 16 levels through the real UI, plus touch, keyboard, Daily, Endless, saving, reduced motion and the scenery's pause button.
- A person played it, and caught the one bug the tests missed (above).
