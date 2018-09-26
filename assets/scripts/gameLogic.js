'use strict'
const gameClass = require('./gameObject.js')

const currentGame = new gameClass.Game(0, false)
console.log(currentGame)

const takeTurn = (location) => {
  currentGame.setLocation(location)
  if (currentGame.status.over) {
    // FIXME: (low) Remove console.log and replace with html message
    console.log(`Game is over. ${currentGame.status.winner} was the winner`)
  } else {
    // FIXME: (low) Remove console log and replace with html message
    console.log('Unable: Game is over')
  }
}

module.exports = {
  takeTurn
}
