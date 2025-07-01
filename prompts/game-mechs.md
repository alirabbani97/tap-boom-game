Design a logic-based tile guessing game with dynamic level progression, increasing difficulty, and strategic tile distribution. The game challenges players to reveal high-value tiles while avoiding bombs, using numeric hints and deduction.

Leveling System
- The game begins at Level 1.
- A new level starts automatically when the player successfully reveals all non-bomb tiles with values greater than 1 (i.e., only 2s and 3s).
- The game continues to progress through levels until the player clicks on a bomb, which ends the session.

Grid and Bomb Scaling by Level
| Level Range | Grid Size | Maximum Bombs Allowed | 
| Levels 1–5 | 4×4 (16) | 3 bombs | 
| Levels 6–10 | 5×5 (25) | 4 bombs | 
| Levels 11+ | 6×6 (36) | 5 to 6 bombs (randomized) | 


- Bombs are randomly placed at the start of each level.
- The number of bombs is capped based on the current level range.
- Grid size increases at key level thresholds to introduce complexity.

Tile Value Distribution
- Non-bomb tiles are assigned values according to the following fixed ratio:
- 1s: 50% of non-bomb tiles
- 2s: 40% of non-bomb tiles
- 3s: 10% of non-bomb tiles
Placement Constraints for 3s:
- 4×4 and 5×5 grids: Each row and column may contain at most one tile with a value of 3.
- 6×6 grid: Each row and column may contain at most two tiles with a value of 3.
These constraints ensure that 3s remain rare and strategically significant, while preserving logical solvability.

Level Indicator
- Display the current level prominently on the game interface (e.g., top-left or top-right corner).
- The level indicator updates dynamically as the player progresses.
- Include a transition animation or message (e.g., “Level Up!”) when advancing to the next level.

Score and Progression
- The score multiplier resets to 1 at the start of each level.
- Revealing a tile multiplies the current score by its value (1, 2, or 3).
- The level is completed only when all non-bomb tiles with values 2 or 3 are revealed.
- Tiles with a value of 1 are optional and do not count toward level completion.

Optional Enhancements
- Add a progress tracker showing how many high-value tiles remain.
- Include a summary screen between levels with stats (score, time, accuracy).
- Track the highest level reached and cumulative score for leaderboard integration.
- Allow sandbox mode with customizable grid size, bomb count, and tile ratios.
