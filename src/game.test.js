import test from 'ava'

import Game from './game'
import Board from './board'

// Aliases
const [X, O, _] = [Game.PLAYER_1, Game.PLAYER_2, Game.NULL]

test('Game.init sets a default board', t => {
  const state = Game.init()
  t.deepEqual(state.board, Board.init())
})

test('Game.winner returns no winner if board is empty', t => {
  const grid = [
    _, _, _,
    _, _, _,
    _, _, _
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.winner(state)

  t.is(winner, _)
})

test('Game.winner returns no winner if game is incomplete', t => {
  const grid = [
    X, O, X,
    _, X, _,
    O, _, O
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.winner(state)

  t.is(winner, _)
})

test('Game.winner detects vertical wins', t => {
  const grid = [
    X, _, _,
    X, O, _,
    X, _, O
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.winner(state)

  t.is(winner, X)
})

test('Game.winner detects horizontal wins', t => {
  const grid = [
    X, _, _,
    O, O, O,
    X, _, X
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.winner(state)

  t.is(winner, O)
})

test('Game.winner detects main diagonal win', t => {
  const grid = [
    O, _, _,
    X, O, X,
    X, _, O
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.winner(state)

  t.is(winner, O)
})

test('Game.winner detects secondary diagonal win', t => {
  const grid = [
    O, _, X,
    O, X, _,
    X, _, _
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.winner(state)

  t.is(winner, X)
})

test('Game.winner returns DRAW if a draw', t => {
  const grid = [
    X, X, O,
    O, O, X,
    X, X, O
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.winner(state)

  t.is(winner, Game.DRAW)
})

test('Game.winner returns INVALID if game is in inconsistent state', t => {
  const grid = [
    X, X, O,
    O, O, O,
    O, O, O
  ] // prettier-ignore
  const board = Board.init({ grid })
  const game = Game.init({ board })

  const { winner } = Game.winner(game)

  t.is(winner, Game.INVALID)
})

test('Game.checkValid sets NULL winner if no win and board is empty', t => {
  const grid = [
    _, _, _,
    _, _, _,
    _, _, _
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.checkValid(state)

  t.is(winner, _)
})

test('Game.checkValid sets NULL winner if no win and counts are equal', t => {
  const grid = [
    O, _, O,
    _, X, X,
    _, _, _
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.checkValid(state)

  t.is(winner, _)
})

test('Game.checkValid sets INVALID if counts differ by more than 1', t => {
  const grid = [
    O, _, O,
    _, X, X,
    _, X, X
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.checkValid(state)

  t.is(winner, Game.INVALID)
})

test('Game.checkValid sets INVALID if X has win and X and O have same count', t => {
  const grid = [
    X, O, O,
    O, X, X,
    _, O, X
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.checkValid(state)

  t.is(winner, Game.INVALID)
})

test('Game.checkValid sets INVALID if O has win and X does not have same count', t => {
  const grid = [
    O, X, X,
    _, O, X,
    _, X, O
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.checkValid(state)

  t.is(winner, Game.INVALID)
})

test('Game.checkValid sets INVALID if both X and O have wins', t => {
  const grid = [
    O, X, _,
    O, X, _,
    O, X, _
  ] // prettier-ignore
  const board = Board.init({ grid })
  const state = Game.init({ board })

  const { winner } = Game.checkValid(state)

  t.is(winner, Game.INVALID)
})
