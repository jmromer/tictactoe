const colors = require('colors')

const Board = require('./board')
const Game = require('./game')

const VALID_ENCODINGS = { 0: ' ', 1: 'X', 2: 'O' }

// From the given list of ENCODINGS, populate a tic-tac-toe board and determine
// its state.
const whoWins = encodings => {
  const board = Board.init({ grid: parseEncodings(encodings) })
  const game = Game.init({ board })
  printGameState(Game.winner(game))
}

// Private: Parse encodings passed via the command line. If invalid, exit with error.
const parseEncodings = encodings => {
  // Parse encodings list
  const encodingList = encodings
    .filter(n => Object.keys(VALID_ENCODINGS).includes(n))
    .map(n => parseInt(n))

  // Validate encoding list
  if (encodingList.length !== 9) {
    const list = colors.yellow(encodingList.join(' ') || 'None')
    const err = colors.red('Error')

    console.log(`${err}: Nine valid ENCODINGS required. Given: ${list}`)
    process.exit(1)
  }

  return encodingList
}

// Private: Print the state of the given game, including a graphical
// representation of the board with winning sequence highlighted, if any.
const printGameState = ({ board, winner, winningSequence }) => {
  const winningSequenceSet = new Set(winningSequence.map(e => e.index))

  Board.rows(board)
    .map(row => row.map(cell => gridCellGraphic(cell, winningSequenceSet)))
    .forEach(row => console.log(`  ${row.join('  ')}  `))

  const piece = VALID_ENCODINGS[winner]
  const winningPlayer = !piece || piece === ' ' ? 'None' : piece

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

// Private: Return a graphical representation of the given grid cell object.
// If the cell is part of a winning sequence (passed as a Set of 1-D indices),
// color it as appropriate.
const gridCellGraphic = ({ index, value }, winningSequenceSet) => {
  const player = VALID_ENCODINGS[value]

  if (winningSequenceSet.size === 0) {
    return colors.yellow(player)
  }

  return winningSequenceSet.has(index)
    ? colors.green(player)
    : colors.grey(player)
}

module.exports = {
  whoWins
}
