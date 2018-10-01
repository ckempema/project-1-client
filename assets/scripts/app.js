'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const state = require('./states.js')
const logic = require('./game/gameLogic.js')

$(() => {
  // your JS code goes here
  // TODO: Create event listeners for all buttons
  state.reset() // set the page to the right appearance
  // Authorization Events:
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  $('#sign-out-button').on('click', authEvents.onSignOut)
  $('#create-new-user-button').on('click', () => {
    state.showCreateUser()
  })
  $('#change-password-button').on('click', state.showChangePassword)
  $('#cancel-change-pwd').on('click', state.hideChangePassword)

  // Game Board Events:
  $('#new-game-button').on('click', logic.onNewGame)

  for (let i = 0; i < 9; i++) { // set up the game board tiles with event listeners
    $(`#game-box-${i}`).on('click', () => {
      logic.play(i)
    })
  }

  $('#make-ai-move').on('click', logic.makeComputerTurn)
  $('#get-all-games-button').on('click', () => { logic.showGames() })
  $('#get-fin-games-button').on('click', () => { logic.showGames(true) })
  $('#get-unfin-games-button').on('click', () => { logic.showGames(false) })
  $('#get-game-form').on('submit', logic.changeGame)

  $('#get-game-button').on('click', state.showSelectGame)
  $('#hide-select-game-button').on('click', state.hideSelectGame)

  $('#show-data-buttons').on('click', state.showRetrieveData)
  $('#hide-data-button').on('click', state.hideRetrieveData)

  $('#clear-data-button').on('click', () => {
    $('#data-msg-display').html('')
  })
})
