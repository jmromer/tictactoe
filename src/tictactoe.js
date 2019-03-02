const colors = require('colors')

const Board = require('./board')
const Game = require('./game')

const PLAYER_ENCODINGS = { X: 1, O: 2 }
const REVERSE_ENCODINGS = { 0: ' ', 1: 'X', 2: 'O' }
const VALID_ENCODINGS = [0, ...Object.values(PLAYER_ENCODINGS)]

// Parse encodings passed via the command line. If invalid, exit with error.
const parseEncodings = encodings => {
  // Parse encodings list
  const encodingList = encodings
    .map(n => parseInt(n))
    .filter(n => VALID_ENCODINGS.includes(n))

  // Validate encoding list
  if (encodingList.length !== 9) {
    const list = colors.yellow(encodingList.join(' ') || 'None')
    const err = colors.red('Error')

    console.log(`${err}: Nine valid ENCODINGS required. Given: ${list}`)
    process.exit(1)
  }

  return { grid: encodingList }
}

// Return a graphical representation of the given grid cell object.
// If the cell is part of a winning sequence, color it as appropriate.
const gridCellGraphic = ({ index, value }, winningSequence) => {
  const player = REVERSE_ENCODINGS[value]

  if (winningSequence.length === 0) {
    return colors.yellow(player)
  }

  return winningSequence.map(e => e.index).includes(index)
    ? colors.green(player)
    : colors.grey(player)
}

// Print the state of the given game, including a graphical representation of
// the board with winning sequence highlighted, if any.
const printGameState = ({ board, player, winner, winningSequence }) => {
  console.log()

  Board.rows(board)
    .map(row => row.map(cell => gridCellGraphic(cell, winningSequence)))
    .forEach(row => console.log(`  ${row.join('  ')}  `))

  const winningPlayer = REVERSE_ENCODINGS[winner.toString()] || 'None'

  console.log(`\n Winner: ${winningPlayer}`)

  switch (winner) {
    case Game.INVALID:
      console.log(' Game is in an invalid state.')
      break
    case Game.DRAW:
      console.log(' Game is a draw.')
      break
    case Game.NULL:
      console.log(' Game is incomplete.')
      break
  }
}

// From the given list of ENCODINGS, populate a tic-tac-toe board and determine
// its state.
const whoWins = encodings => {
  const { grid } = parseEncodings(encodings)
  const board = Board.init({ grid })
  const game = Game.init({ board })
  printGameState(Game.winner(game))
}

module.exports = {
  whoWins
}
