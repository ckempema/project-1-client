'use strict'
const store = require('../store.js')
const score = 100 // set as decided for minMax function

const checkWin = (cells) => {
  /* Check the game board for any win conditions
  Returns true if a win condition exists
  Otherwise returns false */
  // IDEA: Create a checkWin that returns the player rather than bool
  // IDEA: Dynamically check for a win condition somehow?
  // IDEA: Use Transposed arrays and array functions to reduce comparisons?
  // TODO: Clean up ugly hardcoded if statements

  const status = {
    over: false,
    winner: null,
    condition: null
  }

  if (cells[0] === cells[1] && cells[1] === cells[2] && cells[0] !== '') {
    status.over = true
    status.winner = cells[0]
    status.condition = [0, 1, 2]
  } else if (cells[3] === cells[4] && cells[4] === cells[5] && cells[3] !== '') {
    status.over = true
    status.winner = cells[3]
    status.condition = [3, 4, 5]
  } else if (cells[6] === cells[7] && cells[7] === cells[8] && cells[6] !== '') {
    status.over = true
    status.winner = cells[6]
    status.condition = [6, 7, 8]
  } else if (cells[0] === cells[3] && cells[3] === cells[6] && cells[0] !== '') {
    status.over = true
    status.winner = cells[0]
    status.condition = [0, 3, 6]
  } else if (cells[1] === cells[4] && cells[4] === cells[7] && cells[1] !== '') {
    status.over = true
    status.winner = cells[1]
    status.condition = [1, 4, 7]
  } else if (cells[2] === cells[5] && cells[5] === cells[8] && cells[2] !== '') {
    status.over = true
    status.winner = cells[2]
    status.condition = [2, 5, 8]
  } else if (cells[0] === cells[4] && cells[4] === cells[8] && cells[0] !== '') {
    status.over = true
    status.winner = cells[0]
    status.condition = [0, 4, 8]
  } else if (cells[2] === cells[4] && cells[4] === cells[6] && cells[2] !== '') {
    status.over = true
    status.winner = cells[2]
    status.condition = [2, 4, 6]
  } else {
    for (let i = 0; i < 9; i++) {
      if (cells[i] === '') { // As soon as an empty square is found
        return status
      }
    }

    // If no empty spaces return tie state
    status.over = true
    status.winner = 'tie'
    status.condition = []
    return status
  }
  return status
}

const easyAI = () => {
  /* A very basic ai, selects a random box to play in
  returns location of move */
  const game = store.currentGame
  const move = Math.floor(Math.random() * 9)
  if (game.cells[move] === '') { // if the move is not already taken
    return move // return the location of where to move
  }
}

const complexAI = (board, depth, maxPlayer, minPlayer, isMaxPlayer) => {
  /* A recursive function that expects the game and `x` or `o` of what symbol
  the computer is playing for, and a bool of if it is the computers turn
  NOTE: isMaxPlayer should always be true when initially called from outside code
  returns an object of the location of the location of the move and a minMax score. */
  const best = {
    val: null,
    location: null,
    all: []
  }

  const status = checkWin(board)
  if (status.over) { // if the game is over. Recursion Base Case
    if (status.winner === maxPlayer) { // maxPlayer wins
      best.val = score - depth
    } else if (status.winner === minPlayer) { // maxPlayer loses
      best.val = -score + depth // prolonging the inevitable is good
    } else {
      best.val = 0 + depth
    }
    return best // Exit the recursion if the game is over
  }

  if (isMaxPlayer) { // try to max the score
    best.val = -Infinity
    for (let i = 0; i < 9; i++) { // for each square
      if (board[i] === '') { // if not filled
        const local = board.slice()
        local[i] = maxPlayer
        const newVal = complexAI(local, depth + 1, maxPlayer, minPlayer, false)
        if (newVal.val > best.val) {
          best.val = newVal.val
          best.location = i
        }
      }
    }
    return best
  } else { // Min Player
    best.val = Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        const local = board.slice()
        local[i] = minPlayer
        const newVal = complexAI(local, depth + 1, maxPlayer, minPlayer, true)
        if (newVal.val < best.val) {
          best.val = newVal.val
          best.location = i
        }
      }
    }
    return best
  }
}

const executeAI = (marker) => {
  /* Selects and runs the ai based on the value stored in store.compPlayer
  If advanced is selected performs some basic calculations to remove them from the recursive calls
  returns false if no AI is selected
  returns location to move if ai is selected */
  if (!store.currentGame.status.over) { // If the game is not over
    if (store.compSkill === 'ADVANCED') {
      const local = store.currentGame.cells.slice()
      let best
      if (store.currentPlayer === 'x') {
        best = complexAI(local, 0, 'x', 'o', true)
      } else {
        best = complexAI(local, 0, 'o', 'x', true)
      }
      return best.location
    } else if (store.compSkill === 'EASY') {
      return easyAI()
    } else {
      return false
    }
  }
}

module.exports = {
  checkWin,
  executeAI
}
