const Board = require('./board')

const SIZE = 3

const INVALID = -1
const NULL = 0
const PLAYER_1 = 1
const PLAYER_2 = 2
const DRAW = 3

// Build a game state object.
const init = ({ winner, board = null } = {}) => ({
  winner: winner || NULL,
  board: board || Board.init({ size: SIZE, nullValue: NULL }),
  winningSequence: []
})

// Determine if the given game has a winner, is a draw, or is invalid.
// Return the updated game state object.
const winner = game => {
  game = checkValid(game)

  if (game.winner === NULL && Board.isFull(game.board)) {
    return { ...game, winningSequence: [], winner: DRAW }
  }

  return game
}

// Determine if the given board is in a valid state.
// Requires searching for win states for each player.
// Return the updated game state object.
const checkValid = game => {
  const counts = pieceCounts(game.board)
  const diff = counts[PLAYER_1] - counts[PLAYER_2]

  if (![0, 1].includes(diff)) {
    return invalidate(game)
  }

  // Check for wins
  // Two wins is an invalid state
  game = hasWin(game, PLAYER_1)
  game = hasWin(game, PLAYER_2)

  if (game.winner === PLAYER_1) {
    return diff === 1 ? game : invalidate(game)
  }

  // Check if player 2 has a win
  if (game.winner === PLAYER_2) {
    return diff === 0 ? game : invalidate(game)
  }

  return game
}

// Determine if the given game is in a win state for the given player.
// Return the updated game state object.
const hasWin = (game, player) => {
  const { winner, board } = game

  // Search for a win for the given player
  for (let sequence of Board.sequences(board)) {
    if (sequence.some(({ value }) => value !== player)) {
      continue
    }

    if (winner === NULL) {
      return { ...game, winningSequence: sequence, winner: player }
    }

    return invalidate(game)
  }

  return game
}

// Private: Count the pieces on the board.
// Return a counter object.
const pieceCounts = ({ grid }) => {
  const counts = {}

  counts[NULL] = 0
  counts[PLAYER_1] = 0
  counts[PLAYER_2] = 0

  grid.forEach(e => (counts[e] = counts[e] + 1))

  return counts
}

// Private: Set the given game as being in an invalid state.
// Return the updated game state object.
const invalidate = game => {
  return { ...game, winner: INVALID, winningSequence: [] }
}

module.exports = {
  init,
  winner,
  checkValid,
  INVALID,
  NULL,
  PLAYER_1,
  PLAYER_2,
  DRAW
}
