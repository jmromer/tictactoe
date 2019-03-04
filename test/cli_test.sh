#!/usr/bin/env bash

set -e

# switch to projct root directory
curr_file=$(basename "$0" )
root_dir=$(realpath "$0" | sed -E "s/\/test\/${curr_file}//")
cd "$root_dir"

# load testing functions
# shellcheck source=./utilities.sh
. "${root_dir}/test/utilities.sh"

if [[ "$*" =~ "--verbose" ]]; then
  export VERBOSE=true
fi

testcase 'X wins' \
         './tictactoe who-wins 1 2 2 1 1 2 0 0 1' \
         ' X  O  O
           X  X  O
                 X

          Winner: X'

testcase 'O wins' \
         './tictactoe who-wins 2 0 1 1 2 0 1 0 2' \
         ' O     X
           X  O
           X     O

          Winner: O'

testcase 'Draw' \
         './tictactoe who-wins 1 1 2 2 2 1 1 1 2' \
         ' X  X  O
           O  O  X
           X  X  O

          Winner: None
          Game is a draw.'

testcase 'Incomplete Game' \
         './tictactoe who-wins 1 2 2 1 1 2 0 0 0' \
         ' X  O  O
           X  X  O


          Winner: None
          Game is incomplete.'

testcase 'Invalid state' \
         './tictactoe who-wins 1 2 2 1 1 2 1 1 1' \
         ' X  O  O
           X  X  O
           X  X  X

          Winner: None
          Game is in an invalid state.'

testcase 'Invalid input' \
         './tictactoe who-wins 1 3 2 0' \
         'Error: Nine valid ENCODINGS required. Given: 1 2 0'
