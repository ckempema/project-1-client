'use strict'

const gameData = require('./gameData.js')
const api = require('./api.js') // NOTE: different than api file for auth calls
const store = require('../store.js')

const onNewGame = () => {
  api.newGame()
    .then((response) => {
      store.currentGame = gameData.createGame(response)
    })
    .catch(console.log) // TODO: replace with actual function
}

const play = (location) => {
  // Play the game from user click
  const game = store.currentGame
  if (game !== undefined) {
    game.takeTurn(location)
  } else {
    // FIXME: (low) replace with html output
    console.log('ERROR: No Game Defined')
  }
}

module.exports = {
  onNewGame,
  play
}
