plain() {
  # strip color codes and trailing whitespace
  sed -r "s:\x1B\[[0-9;]*[mK]::g" |\
    sed -E 's/[ \t]+$//'
}

strip() {
  # strip leading and trailing whitespace
  awk '{$1=$1};1'
}

pass() {
  printf "  \033[0;32m\u2714Pass\033[0m\n\n"
}

fail() {
  printf "  \033[0;31m\u2716Fail\033[0m\n\n"
}

longest_line_length() {
  awk '{ print length, $0 }' |\
    sort -nrk 1,1 |\
    head -1 |\
    awk '{ print $1 }'
}

print_diff() {
  local expected="$1"
  local actual="$2"
  local len="$(echo "$actual" | longest_line_length)"

  let width=len+5
  let double=width*2

  printf "%-${width}s%-${width}s\n\n" "Expected:" "Actual:"
  colordiff <(echo "$expected") <(echo "$actual") --side-by-side --width=${double}
}

assert_equal() {
  local actual="$(echo "$1" | strip)"
  local expected="$(echo "$2" | strip)"
  local message="$3"

  if [[ "$actual" == "$expected" ]]; then
    pass
    if [[ -n "$VERBOSE" ]]; then
      printf "%s\n\n" "$message"
    fi
  else
    fail
    print_diff "$expected" "$actual"
    exit 1
  fi
}

testcase () {
  local test_name="$1"
  local command="$2"
  local expected_output="$3"

  printf "\n> \033[1;33mScenario: %s\033[0m\n" "$test_name"
  printf "  %s\n" "$command"

  local actual_output="$(eval "$command" 2>&1 | tee )"
  local plain_output="$(echo "$actual_output" | plain)"
  assert_equal "$plain_output" "$expected_output" "$actual_output"
}
