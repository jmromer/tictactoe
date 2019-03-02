// Build a board state object.
const init = ({ size = 3, nullValue = 0, grid = null } = {}) => {
  grid = grid || new Array(size ** 2).fill(nullValue)

  if (grid.length / size !== size) {
    throw new Error(
      `Incompatible grid. 1-D grid length ${
        grid.length
      } must be a multiple of size ${size}`
    )
  }

  return { grid, nullValue, size }
}

// Return an array of all "sequences" (rows, columns, diagonals) from the given
// board.
const sequences = board => {
  return [...rows(board), ...columns(board), ...diagonals(board)]
}

// Return true if no cells in the board are unfilled, else false.
const isFull = board => !board.grid.includes(board.nullValue)

// Collect the cells along the rows of the given board.
// Return an array of arrays.
const rows = board => {
  const { size } = board

  const rows = []

  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size; j++) {
      row.push(get(board, i, j))
    }
    rows.push(row)
  }

  return rows
}

// Collect the cells along the columns of the given board.
// Return an array of arrays.
const columns = board => {
  const { size } = board
  const cols = []

  for (let j = 0; j < size; j++) {
    let col = []
    for (let i = 0; i < size; i++) {
      col.push(get(board, i, j))
    }
    cols.push(col)
  }

  return cols
}

// Collect the cells along the diagonals of the given board.
// Return an array of arrays.
const diagonals = board => {
  const { size } = board

  const diagonals = []

  let diagonal = []
  for (let i = 0; i < size; i++) {
    diagonal.push(get(board, i, i))
  }
  diagonals.push(diagonal)

  diagonal = []
  for (let i = 0; i < size; i++) {
    diagonal.push(get(board, i, size - 1 - i))
  }
  diagonals.push(diagonal)

  return diagonals
}

// Private: Retrieve a cell from a 1-D board given its 2-D coordinates.
// Return an object with the 1-D index and value of the cell.
const get = (board, row, col) => ({
  index: index(row, col, board.size),
  value: board.grid[index(row, col, board.size)]
})

// Private: Compute a 1-D index based on the 2-D row and column indices, and the
// size (side length) of the grid.
const index = (row, col, size) => col + size * row

module.exports = { init, sequences, isFull, diagonals, rows, columns }
