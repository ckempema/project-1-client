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
  state.setAuthState(0) // set the page to the right appearance
  // Authorization Events:
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  $('#sign-out-button').on('click', authEvents.onSignOut)
  $('#create-new-user-button').on('click', () => {
    state.setAuthState(1)
  })
  $('#change-password-button').on('click', () => {
    state.setAuthState(3)
  })

  // Game Board Events:
  $('#new-game-button').on('click', logic.onNewGame)
  for (let i = 0; i < 9; i++) { // set up the game board tiles with event listeners
    $(`#game-box-${i}`).on('click', () => {
      logic.play(i)
    })
  }
})
