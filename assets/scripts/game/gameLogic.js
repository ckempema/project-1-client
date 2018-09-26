'use strict'
const gameData = require('./gameData.js')
const api = require('./api.js')

const currentGame = new gameData.Game(0, false)
console.log(currentGame)

const onNewGame = () => {
  api.newGame()
    .then(gameData.createGame) // TODO: replace with actual function
    .catch(console.log) // TODO: replace with actual function
}

module.exports = {
  takeTurn,
  onNewGame
}
