'use strict'
const gameData = require('./gameData.js')
const store = require('../store.js')

// NOTE: Not the same file as auth/ui.js
const dispGames = (response) => {
  $('#data-msg-display').html('')

  const games = response.games
  const topHTML = (`
    <span>
      <h4> Queried Games: ${games.length}</h4>
    </span>
    `)
  $('#data-msg-display').append(topHTML)
  for (let i = 0; i < games.length; i++) {
    const currentGame = gameData.createGame(games[i])
    currentGame.checkWin()
    const gameStr = currentGame.boardToHTML()
    const statusStr = currentGame.statusToString()

    const msgHTML = (`
      <span>
        <p> Game ID: ${currentGame.id} <p>
        <span> ${gameStr} </span>
        <span> ${statusStr} </span>
        <br/>
      </span>
    `)
    $('#data-msg-display').append(msgHTML)
  }
}

const playGame = (response) => { // change to a new game in the main window
  store.currentGame = gameData.createGame(response.game)
  store.currentGame.setBoard()
  $('#data-msg-display').html(`Pulled Game ${store.currentGame.id} to play`)
  $(`#current-msg-display`).html(store.currentGame.statusToString())
}

module.exports = {
  dispGames,
  playGame
}
