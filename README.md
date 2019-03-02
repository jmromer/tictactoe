tictactoe
=========

[![Build Status][build-status]][build]

[build-status]: https://travis-ci.org/jmromer/tictactoe.svg?branch=master
[build]: https://travis-ci.org/jmromer/tictactoe

> A command-line tic-tac-toe game state checker

```text
% tictactoe who-wins --help
Usage: who-wins [options] <ENCODINGS...>

Options:
  -h, --help  output usage information

Determine the winner of the given tic-tac-toe game, provided as ENCODINGS,
a space-separated sequence of nine digits representing pieces, with spaces,
crosses, and naughts encoded as 0, 1, and 2, respectively. Invalid encodings
are ignored.

Example:

    % tictactoe who-wins 1 2 2 1 1 2 0 0 1

     X  O  O
     X  X  O
     X

    Winner: X
```

Examples
--------

### Player 2 wins

```text
% tictactoe who-wins 2 0 1 1 2 0 1 0 2

  O     X
  X  O
  X     O

 Winner: O
```

### Draw

```text
% tictactoe who-wins 1 1 2 2 2 1 1 1 2

  X  X  O
  O  O  X
  X  X  O

 Winner: None
 Game is a draw.
```


### Incomplete game

```text
% tictactoe who-wins 1 2 2 1 1 2 0 0 0

  X  O  O
  X  X  O


 Winner:
 Game is incomplete.
```

### Invalid state

```text
% tictactoe who-wins 1 2 2 1 1 2 1 1 1

  X  O  O
  X  X  O
  X  X  X

 Winner: None
 Game is in an invalid state.
```

### Invalid input

```text
% tictactoe who-wins 1 3 2 0
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
```
