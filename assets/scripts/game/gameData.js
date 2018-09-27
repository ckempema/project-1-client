'use strict'
/* Contains the game logic for tic tac toe */
const api = require('./api.js')

class Game {
  /* A class that contains the game state as well as functions
  for playing the game */
  constructor (apiGame) {
    this.id = apiGame.id
    // TODO: remove console log from production environment
    this.cells = apiGame.cells
    this._currentPlayer = 'x' // NOTE: contains marker not player object
    this.player_x = apiGame.player_x
    this.player_o = apiGame.player_o
    this.status = {
      over: apiGame.over,
      winner: null,
      condition: null
    }
    this.movesMade = 0
    this.checkWin() // Set the win status to the correct values
    this.updateCurrentPlayer() // Set the current player to the right player
  }

  getCurrentPlayer () {
    // Getter function for this._currentPlayer
    return this._currentPlayer
  }

  getPlayerObject (marker) {
    /* getter function that returns the player object associated with the proveded marker */
    switch (marker) {
      case 'x':
        return this.playerX
      case 'o':
        return this.playerO
      default:
        return null
    }
  }

  rotatePlayer () {
    /* Set the games current player to the next player. If there is an error
    then _currentPlayer will be set to 'x'.
    Returns the _currentPlayer after setting */
    switch (this._currentPlayer) {
      case 'x':
        this._currentPlayer = 'o'
        break
      case 'o':
        this._currentPlayer = 'x'
        break
      default:
        this._currentPlayer = 'x'
    }
    return this._currentPlayer
  }

  takeTurn (location) {
    /* Handles turn logic including
      setting correct box, Checking for win, rotating player, increment movesMade, and valating game not over
      Returns true if everything was valid,
      false if turn not valid
      */

    if (!this.status.over) { // If the game is not over
      if (this.setLocation(location)) { // if the location was set correctly
        this.movesMade += 1
        this.rotatePlayer()
        $(`#current-msg-display`).html(this.statusToString())
        return true
      } else {
        // FIXME: (low) Remove and replace with html message
        console.log('WARNING: Invalid Move')
      }
    } else {
      // FIXME: (low) Remove console log and replace with html message
      console.log(`Game is over. ${this.status.winner} was the winner`)
      return false
    }
  }

  setLocation (location) {
    /* Set the value of a location on the gameboard to marker to the given marker
    Contains validiation of location input
    Returns false if failed to set for any reason
    Returns true if valid selection and correct assignment */
    if (location < 9) { // Check that location is inside of game board
      if (this.cells[location] === undefined || this.cells[location] === '') {
        this.cells[location] = this._currentPlayer // update the local copy
        this.checkWin()

        const update = { // prepare an update object for the api
          index: location,
          marker: this._currentPlayer,
          over: this.status.over
        }
        api.updateGameServer(this.id, update) // update the server copy
          .then((response) => {
            this.cells = response.game.cells // ensure local equals server copy
          })
          .catch(console.log) // TODO: (medium) replace console log with failure function that outputs to game terminal
        $(`#game-box-${location}`).html(this._currentPlayer)

        return true // If there is a need to check for valid moves later
      } else {
        // NOTE: Remove console.log from production environment
        console.log(`Invalid Location: Location: ${location} already set`)
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
    // IDEA: Use Transposed arrays and array functions to reduce comparisons?
    // TODO: Clean up ugly hardcoded if statements
    const cells = this.cells
    if (cells[0] === cells[1] && cells[1] === cells[2] && cells[0] !== '') {
      this.status.over = true
      this.status.winner = this.cells[0]
      this.status.condition = [0, 1, 2]
    } else if (cells[3] === cells[4] && cells[4] === cells[5] && cells[3] !== '') {
      this.status.over = true
      this.status.winner = this.cells[3]
      this.status.condition = [3, 4, 5]
    } else if (cells[6] === cells[7] && cells[7] === cells[8] && cells[6] !== '') {
      this.status.over = true
      this.status.winner = this.cells[5]
      this.status.condition = [6, 7, 8]
    } else if (cells[0] === cells[3] && cells[3] === cells[6] && cells[0] !== '') {
      this.status.over = true
      this.status.winner = this.cells[0]
      this.status.condition = [0, 3, 6]
    } else if (cells[1] === cells[4] && cells[4] === cells[7] && cells[1] !== '') {
      this.status.over = true
      this.status.winner = this.cells[1]
      this.status.condition = [1, 4, 7]
    } else if (cells[2] === cells[5] && cells[5] === cells[8] && cells[2] !== '') {
      this.status.over = true
      this.status.winner = this.cells[2]
      this.status.condition = [2, 5, 8]
    } else if (cells[0] === cells[4] && cells[4] === cells[8] && cells[0] !== '') {
      this.status.over = true
      this.status.winner = this.cells[0]
      this.status.condition = [0, 4, 8]
    } else if (cells[2] === cells[4] && cells[4] === cells[6] && cells[2] !== '') {
      this.status.over = true
      this.status.winner = this.cells[2]
      this.status.condition = [2, 4, 6]
    } else if (this.movesMade === 9) {
      this.status.over = true
      this.status.winner = 'tie'
      this.status.condition = []
    }
    return this.status
  }

  boardToHTML () {
    /* return a pretty string of the game state */
    const temp = this.cells
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === '') {
        temp[i] = '-'
      }
    }
    const htmlStr = (`
      <div>${temp[0]}${temp[1]}${temp[2]}</div>
      <div>${temp[3]}${temp[4]}${temp[5]}</div>
      <div>${temp[6]}${temp[7]}${temp[8]}</div>
    `)
    return htmlStr
  }

  statusToString () {
    let retStr = ''
    if (this.status.over) {
      if (this.status.winner === 'tie') {
        retStr += `ID: ${this.id} >Status: Tied`
      } else {
        retStr += `ID: ${this.id} >Status: Player ${this.status.winner} Wins!`
      }
    } else {
      retStr += `ID: ${this.id} >Status: Ongoing Waiting For Player ${this._currentPlayer.toUpperCase()}`
    }
    return retStr
  }

  updateCurrentPlayer () {
    let x = 0
    let o = 0
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] === 'o') {
        o++
      } else if (this.cells[i] === 'x') {
        x++
      }
    }
    if (x > o) {
      this._currentPlayer = 'o'
    } else if (o >= x) {
      this._currentPlayer = 'x'
    } else {
      this._currentPlayer = 'x'
    }
  }

  setBoard () {
    /* Sets the gameplay board to whatever show the game */
    for (let i = 0; i < 9; i++) {
      $(`#game-box-${i}`).html(this.cells[i])
    }
  }
}

const createGame = (game) => {
  /* Create a new Game object
  takes in an api game response
  returns game object */

  const temp = new Game(game)
  return temp
}

// TODO: Test game logic
module.exports = {
  Game,
  createGame
}
