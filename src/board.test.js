import test from 'ava'

import Board from './board'

test('Board.isFull returns false if empty', t => {
  const grid = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const board = Board.init({ grid })
  t.false(Board.isFull(board))
})

test('Board.isFull returns false if non-full', t => {
  const grid = [0, 1, 0, 2, 0, 1, 2, 0, 0]
  const board = Board.init({ grid })
  t.false(Board.isFull(board))
})

test('Board.isFull returns true if it has no null entries', t => {
  const grid = [2, 1, 1, 2, 2, 1, 2, 1, 2]
  const board = Board.init({ grid })
  t.true(Board.isFull(board))
})

test('Board.diagonals returns diagonals', t => {
  const grid = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
  ] // prettier-ignore
  const board = Board.init({ grid })

  const [primary, secondary] = Board.diagonals(board)

  t.deepEqual(primary, [
    { index: 0, value: 1 },
    { index: 4, value: 5 },
    { index: 8, value: 9 }
  ])
  t.deepEqual(secondary, [
    { index: 2, value: 3 },
    { index: 4, value: 5 },
    { index: 6, value: 7 }
  ])
})

test('Board.rows returns rows', t => {
  const grid = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
  ] // prettier-ignore
  const board = Board.init({ grid })

  const [first, second, third] = Board.rows(board)

  t.deepEqual(first, [
    { index: 0, value: 1 },
    { index: 1, value: 2 },
    { index: 2, value: 3 }
  ])
  t.deepEqual(second, [
    { index: 3, value: 4 },
    { index: 4, value: 5 },
    { index: 5, value: 6 }
  ])
  t.deepEqual(third, [
    { index: 6, value: 7 },
    { index: 7, value: 8 },
    { index: 8, value: 9 }
  ])
})

test('Board.columns returns columns', t => {
  const grid = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
  ] // prettier-ignore
  const board = Board.init({ grid })

  const [first, second, third] = Board.columns(board)

  t.deepEqual(first, [
    { index: 0, value: 1 },
    { index: 3, value: 4 },
    { index: 6, value: 7 }
  ])
  t.deepEqual(second, [
    { index: 1, value: 2 },
    { index: 4, value: 5 },
    { index: 7, value: 8 }
  ])
  t.deepEqual(third, [
    { index: 2, value: 3 },
    { index: 5, value: 6 },
    { index: 8, value: 9 }
  ])
})

test('Board.sequences returns all sequences as arrays', t => {
  const grid = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const board = Board.init({ grid })
  const seqs = Board.sequences(board)
  t.is(seqs.length, 8)
})

test('Board.init sets default grid, can override nullValue and size', t => {
  const board = Board.init({ nullValue: 9, size: 2 })
  const { grid } = Board.init(board)
  t.deepEqual(grid, [9, 9, 9, 9])
})

test('Board.init raises error if overrides are inconsistent', t => {
  const boardInit = () => Board.init({ nullValue: 9, size: 2, grid: [] })
  t.throws(() => boardInit(), new RegExp('Incompatible grid'))
})
