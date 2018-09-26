'use strict'
/* Contains the game logic for tic tac toe */

class Game {
  /* A class that contains the game state as well as functions
  for playing the game */
  constructor (id, currentPlayer = 'x', gameBoard = []) {
    this.id = id
    this.gameBoard = gameBoard
    if (currentPlayer === 'x' || currentPlayer === 'o') { // Validate input
      this._currentPlayer = currentPlayer
    } else {
      this._currentPlayer = 'x'
    }
  }

  getPlayer () {
    // Getter function for this._currentPlayer
    return this._currentPlayer
  }

  rotatePlayer () {
    /* Set the games current player to the next player. If there is an error
    then _currentPlayer will be set to 'x'.
    Returns the _currentPlayer after setting */
    if (this._currentPlayer === 'x') {
      this._currentPlatyer = 'o'
    } else if (this._currentPlayer === 'o') {
      this._currentPlayer = 'x'
    } else {
      this._currentPlayer = 'x'
      // NOTE: Remove log statement from production environment
      console.log('ERROR currentPlayer must be either X or O')
    }
    return this._currentPlayer
  }

  setGameLocation (row, col, marker) {
    /* Set the value of a location on the gameboard to marker to the given marker
    Returns false if failed to set for any reason
    Returns true if valid selection and correct assignment */
    const location = row * 3 + col
    if (location < 9) { // Check that location is inside of game board
      if (this.gameBoard[location] === undefined || this.gameBoard[location] === '') {
        if (marker === 'x' || marker === 'y') { // ensure a valid marker has been passed
          this.gameBoard[location] = marker
          return true // If there is a need to check for valid moves later
        } else {
          // NOTE: : Remove console.log from production environment
          console.log(`Invalid Marker sent to setMarker: ${marker}`)
          return false
        }
      } else {
        // NOTE: Remove console.log from production environment
        console.log(`Invalid Location: ROW: ${row} COLUMN: ${col} already set`)
        return false
      }
    } else {
      // NOTE: Remove console.log from production environment
      console.log(`Invalid location: ${location} is out of bounds`)
      return false
    }
  }

  checkWin () {
    /* Check the game board for any win conditions
    Returns true if a win condition exists
    Otherwise returns false */
    // IDEA: Create a checkWin that returns the player rather than bool
    // IDEA: Dynamically check for a win condition somehow?
    // TODO: Clean up ugly hardcoded if statements
    if ((this.gameBoard[0] === this.gameBoard[1] === this.gameBoard[2]) ||
      (this.gameBoard[3] === this.gameBoard[4] === this.gameBoard[5]) ||
      (this.gameBoard[6] === this.gameBoard[7] === this.gameBoard[8]) ||
      (this.gameBoard[0] === this.gameBoard[3] === this.gameBoard[6]) ||
      (this.gameBoard[1] === this.gameBoard[4] === this.gameBoard[7]) ||
      (this.gameBoard[2] === this.gameBoard[5] === this.gameBoard[8]) ||
      (this.gameBoard[0] === this.gameBoard[4] === this.gameBoard[8]) ||
      (this.gameBoard[2] === this.gameBoard[4] === this.gameBoard[6])) {
      return true
    } else {
      return false
    }
  }
}

// TODO: Test game logic
module.exports = {
  Game
}
