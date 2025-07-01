this is a tile guessing game,
Tile Guessing Game – Core Design Specification
Design a logic-based tile guessing game with the following mechanics and structure:

Grid Layout
- The game board is a square grid of variable size (e.g., 4×4, 5×5, 6×6, etc.).
- Each cell (tile) starts hidden and can be revealed by the player.
- Numeric headers are displayed along the top (columns) and left (rows) of the grid.

Objective
- The player must reveal all non-bomb tiles.
- Revealing a bomb results in an immediate game over.

Tile Values and Scoring
- Each non-bomb tile contains a hidden value: either 1, 2, or 3.
- When a tile is revealed, its value is multiplied with the current score.
- The score starts at 1.
- Example: Revealing tiles with values 2, 3, and 1 results in a score of 1 × 2 × 3 × 1 = 6.

Row and Column Headers
- Each row and column has a header number that represents the sum of all tile values in that row or column (excluding bombs).
- Example: If a row contains three tiles with values 3, 2, and 1, the row header displays 6.
- These headers serve as logical clues to help the player deduce which tiles are safe.

Bomb Mechanics
- A fixed number of tiles are randomly assigned as bombs.
- Bombs do not contribute to the row or column header sums.
- The number of bombs can scale with grid size or difficulty level.

Gameplay Flow
- The player selects a tile to reveal.
- If the tile is a bomb, the game ends.
- If the tile is a number, it is revealed and the score is updated by multiplying the value.
- The player uses the row and column headers to infer the location of bombs and safe tiles.
- The game is won when all non-bomb tiles are successfully revealed.


