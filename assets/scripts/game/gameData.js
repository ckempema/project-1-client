'use strict'
/* Contains the game logic for tic tac toe */
const api = require('./api.js')
const ai = require('./ai.js')
const store = require('../store.js')

class Game {
  /* A class that contains the game state as well as functions
  for playing the game */
  constructor (apiGame) {
    this.id = apiGame.id
    this.cells = apiGame.cells
    this._currentPlayer = 'x' // NOTE: contains marker not player object
    this.player_x = apiGame.player_x
    this.player_o = {}
    this.status = {
      over: apiGame.over,
      winner: null,
      condition: null
    }
    this.movesMade = 0
    this.status = ai.checkWin(this.cells) // Set the win status to the correct values
    this.updateCurrentPlayer() // Set the current player to the right player

    this.hasComputerPlayers = true
    this.player_x.isComputer = false
    this.player_o.isComputer = true // FIXME: bug null assignment see line 14
  }

  getCurrentPlayer () {
    // Getter function for this._currentPlayer
    return this._currentPlayer
  }

  getCurrentPlayerAI () {
    // returns true if _currentPlayer is set as an AI opponent
    if (this._currentPlayer === 'x') {
      if (this.player_x.isComputer) {
        return true
      } else {
        return false
      }
    } else if (this._currentPlayer === 'o') {
      if (this.player_o.isComputer) {
        return true
      } else {
        return false
      }
    }
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

  takePlayerTurn (location) {
    /* Handles turn logic including
      setting correct box, Checking for win, rotating player, increment movesMade, and valating game not over
      Returns true if everything was valid,
      false if turn not valid
      */
    console.log(`Player Turn: Marker ${this._currentPlayer} at ${location}`)
    if (!this.status.over) { // If the game is not over
      if (this.setLocation(location)) { // if the location was set correctly
        this.movesMade += 1
        this.rotatePlayer()
        this.status = ai.checkWin(this.cells)
        $(`#current-msg-display`).html(this.statusToString())
      } else {
        return false
      }
    } else {
      $(`#current-msg-display`).html(`Game is over. Start or load a new one. Loc: gameData.js takePlayerTurn`)
    }
  }

  computerTurn () {
    if (this.hasComputerPlayers) {
      if (this.getCurrentPlayerAI) {
        console.log(`Making move for Player ${this._currentPlayer} on ${store.compSkill} level`)
        const location = ai.executeAI(this.getCurrentPlayer)
        console.log(`Computer attempting to play at ${location} within computerTurn`)
        console.log('Current game before computer set location', this.cells)
        if (this.setLocation(location)) {
          console.log(`Success: Player Moved at ${location}`)
          this.movesMade += 1
          this.rotatePlayer()
          this.status = ai.checkWin(this.cells)
          $(`#current-msg-display`).html(this.statusToString())
        } else {
          console.log(`Invalid computer move at ${location}`)
          // $(`#current-msg-display`).html(`Computer has attempted invalid move at ${compLoc}`)
        }
      }
      return true
    } else {
      $(`#current-msg-display`).html(`WARNING: Invalid Move`)
      this.setBoard()
    }
  }

  setLocation (location) {
    console.log(`Attempting to set location ${location} with ${this._currentPlayer}`)
    /* Set the value of a location on the gameboard to marker to the given marker
    Contains validiation of location input
    Returns false if failed to set for any reason
    Returns true if valid selection and correct assignment */
    if (location < 9 && location !== null) { // Check that location is inside of game board
      console.log(`Valid Location called in setLocation: ${location}`)
      console.log('Current Game', this.cells)
      if (this.cells[location] === undefined || this.cells[location] === '') {
        this.cells[location] = this._currentPlayer // update the local copy
        this.status = ai.checkWin(this.cells)
        console.log(this.status)

        const update = { // prepare an update object for the api
          index: location,
          marker: this._currentPlayer,
          over: this.status.over
        }
        api.updateGameServer(this.id, update) // update the server copy
          .then((response) => {
            this.cells = response.game.cells // ensure local equals server copy
          })
          .catch((response) => {
            $(`#current-msg-display`).html('ERROR: Unable to update server Loc: gameData setLocation ~150')
            console.log(response)
            console.log(update)
            console.log(this.id)
          })
        $(`#game-box-${location}`).html(this._currentPlayer.toUpperCase())

        return true
      } else {
        $(`#current-msg-display`).html(`WARNING: Game ${this.id} location ${location} has already been selected`)
        return false
      }
    } else {
      $(`#current-msg-display`).html(`ERROR: Move at ${location} is out of bounds`)
      return false
    }
  }

  boardToHTML () {
    /* return a pretty string of the game state */
    // TODO: Make this much much better
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
    /* Returns a string of the games status for output directly to gui */
    let retStr = ''
    if (this.status.over) {
      if (this.status.winner === 'tie') {
        retStr += `ID: ${this.id} >Status: Tied`
      } else {
        retStr += `ID: ${this.id} > Status: Player ${this.status.winner.toUpperCase()} Wins!`
      }
    } else {
      retStr += `ID: ${this.id} > Status: Ongoing Waiting For Player ${this._currentPlayer.toUpperCase()}`
    }
    return retStr
  }

  updateCurrentPlayer () {
    /* Checks who the  current player should be for the given gameboard
    defaults to x if no moves made
    Also sets the this.movesMade variable to the correct number
    does not return, sets this._currentPlayer
    NOTE: Called in constructor for Game */

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
    this.movesMade = x + o
  }

  setBoard () {
    /* Sets the main gameplay board to show the parent game object
    returns nothing */
    for (let i = 0; i < 9; i++) {
      $(`#game-box-${i}`).html(this.cells[i])
    }
  }
}

const createGame = (game) => {
  /* Create a new Game object using game
  created to clean up object syntax in other files
  takes in a game object exactly as structured by API
  returns game object created */

  const temp = new Game(game)
  return temp
}

module.exports = {
  Game,
  createGame
}
