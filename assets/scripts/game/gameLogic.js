'use strict'

const gameData = require('./gameData.js')
const api = require('./api.js') // NOTE: different than api file for auth calls
const store = require('../store.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const ui = require('./ui.js')

const onNewGame = () => {
  /* When the new game button  is clicked create a new game and store it in store
  Does not return anything */
  api.newGame()
    .then((response) => {
      store.currentGame = gameData.createGame(response.game)
      store.currentGame.setBoard()
      $(`#current-msg-display`).html(`Game ${store.currentGame.id} Created: X moves first`)
    })
    .catch((response) => {
      $(`#current-msg-display`).html('ERROR: Unable to connect to Server')
    })
  store.compSkill = 'ADVANCED'
}

const play = (location) => {
  /* logic to make a players move based on passed location from click
  Does not return anything */
  const game = store.currentGame // the game to play
  if (game !== undefined && game !== null) {
    game.takePlayerTurn(location)
  } else {
    $(`#current-msg-display`).html('ERROR: no game is currently active. Select a game or select "New Game Button"')
  }
}

const makeComputerTurn = () => {
  /* Very basic function, calls computerTurn on current game
  No return */
  if (store.currentGame !== undefined && store.currentGame !== null) {
    store.currentGame.computerTurn()
  } else {
    $(`#current-msg-display`).html('ERROR: no game is currently active. Select a game or select "New Game Button"')
  }
}

const showGames = (status) => {
  /* uses api call to get specified games from server
  calls ui.disp games to print to Window
  does not return */
  if (status !== undefined) {
    api.getGames(status)
      .then(ui.dispGames)
      .catch((response) => {
        $(`#current-msg-display`).html('ERROR: Unable to collect games from server')
      })
  } else {
    api.getAllGames()
      .then(ui.dispGames)
      .catch((response) => {
        $(`#current-msg-display`).html('ERROR: Unable to collect games from server')
      })
  }
}

const changeGame = (event) => {
  /* Replace current game with game given by status field
  does not return */
  event.preventDefault()
  const id = getFormFields(event.target).id
  api.pullGame(id)
    .then(ui.playGame)
    .catch((response) => {
      $(`#current-msg-display`).html(`ERROR: Unable to retrive game ${id} from server`)
    })
}

module.exports = {
  onNewGame,
  play,
  makeComputerTurn,
  showGames,
  changeGame
}
