'use strict'

const gameData = require('./gameData.js')
const api = require('./api.js') // NOTE: different than api file for auth calls
const store = require('../store.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const ui = require('./ui.js')

const onNewGame = () => {
  api.newGame()
    .then((response) => {
      store.currentGame = gameData.createGame(response.game)
      store.currentGame.setBoard()
    })
    .catch(console.log) // TODO: replace with actual function
}

const play = (location) => {
  /* logic to make a players move based on passed location */
  const game = store.currentGame // the game to play
  if (game !== undefined) {
    game.takeTurn(location)
  } else {
    $(`#current-msg-display`).html('ERROR: no game is currently active. Select a game or select "New Game Button"')
  }
}

const showGames = (status) => {
  /* Show all the game data retrieved from server call */
  console.log('DEBUG: showGames (gameLogic.js) called')
  if (status !== undefined) {
    api.getGames(status)
      .then(ui.dispGames)
      .catch(console.log)
  } else {
    api.getAllGames()
      .then(ui.dispGames)
      .catch(console.log)
  }
}

const changeGame = (event) => {
  /* Replace current game with game given by event field */
  event.preventDefault()
  const id = getFormFields(event.target).id
  // TODO: remove console log statement from production environment
  console.log(`DEBUG: pullGame (gameLogic.js) called id: ${id}`)
  api.pullGame(id)
    .then(ui.playGame)
    .catch(console.log)
}

module.exports = {
  onNewGame,
  play,
  showGames,
  changeGame
}
