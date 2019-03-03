tictactoe
=========

[![Build Status][build-status]][build]

[build-status]: https://travis-ci.org/jmromer/tictactoe.svg?branch=master
[build]: https://travis-ci.org/jmromer/tictactoe

> A command-line tic-tac-toe game state checker

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [tictactoe](#tictactoe)
    - [Usage](#usage)
    - [Examples](#examples)
        - [Player 2 wins](#player-2-wins)
        - [Draw](#draw)
        - [Incomplete game](#incomplete-game)
        - [Invalid state](#invalid-state)
        - [Invalid input](#invalid-input)
    - [Dependencies](#dependencies)
    - [Running tests](#running-tests)
        - [Coverage](#coverage)

<!-- markdown-toc end -->


Usage
-----

```text
% ./tictactoe who-wins --help
Usage: who-wins [options] <ENCODINGS...>

Options:
  -h, --help  output usage information

Determine the winner of the given tic-tac-toe game, provided as ENCODINGS,
a space-separated sequence of nine digits representing pieces, with spaces,
crosses, and naughts encoded as 0, 1, and 2, respectively. Invalid encodings
are ignored.

Example:

    ./tictactoe who-wins 1 2 2 1 1 2 0 0 1

     X  O  O
     X  X  O
     X

    Winner: X
```

Examples
--------

### Player 2 wins

```text
./tictactoe who-wins 2 0 1 1 2 0 1 0 2

  O     X
  X  O
  X     O

 Winner: O
```

### Draw

```text
./tictactoe who-wins 1 1 2 2 2 1 1 1 2

  X  X  O
  O  O  X
  X  X  O

 Winner: None
 Game is a draw.
```

### Incomplete game

```text
./tictactoe who-wins 1 2 2 1 1 2 0 0 0

  X  O  O
  X  X  O


 Winner: None
 Game is incomplete.
```

### Invalid state

```text
./tictactoe who-wins 1 2 2 1 1 2 1 1 1

  X  O  O
  X  X  O
  X  X  X

 Winner: None
 Game is in an invalid state.
```

### Invalid input

```text
./tictactoe who-wins 1 3 2 0
Error: Nine valid ENCODINGS required. Given: 1 2 0
```

Dependencies
-------------

- Node 11.7.0

```text
asdf install nodejs 11.7.0
npm install --production
```

Running tests
-------------

```text
npm install
npm test
```

```text
  ✔ board › Board.isFull returns false if empty
  ✔ board › Board.isFull returns false if non-full
  ✔ board › Board.isFull returns true if it has no null entries
  ✔ board › Board.diagonals returns diagonals
  ✔ board › Board.rows returns rows
  ✔ board › Board.columns returns columns
  ✔ board › Board.sequences returns all sequences as arrays
  ✔ game › Game.init sets a default board
  ✔ board › Board.init sets default grid, can override nullValue and size
  ✔ game › Game.winner returns no winner if board is empty
  ✔ board › Board.init raises error if overrides are inconsistent
  ✔ game › Game.winner returns no winner if game is incomplete
  ✔ game › Game.winner detects vertical wins
  ✔ game › Game.winner detects horizontal wins
  ✔ game › Game.winner detects main diagonal win
  ✔ game › Game.winner detects secondary diagonal win
  ✔ game › Game.winner sets DRAW if a draw
  ✔ game › Game.winner sets INVALID if game is in inconsistent state
  ✔ game › Game.winner sets NULL winner if no win and board is empty
  ✔ game › Game.winner sets NULL winner if no win and counts are equal
  ✔ game › Game.winner sets INVALID if counts differ by more than 1
  ✔ game › Game.winner sets INVALID if X has win and X and O have same count
  ✔ game › Game.winner sets INVALID if O has win and X does not have same count
  ✔ game › Game.winner sets INVALID if both X and O have wins

  24 tests passed
```

### Coverage

```text
----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |      100 |      100 |      100 |      100 |                   |
 board.js |      100 |      100 |      100 |      100 |                   |
 game.js  |      100 |      100 |      100 |      100 |                   |
----------|----------|----------|----------|----------|-------------------|
```
