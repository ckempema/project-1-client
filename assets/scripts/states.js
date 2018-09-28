'use strict'

const store = require('./store.js')

const resetFields = () => {
  // Reset every form field on the page to blank
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
  $('#change-password-form').trigger('reset')
  $('#get-game-form').trigger('reset')
  $('#data-msg-display').val('')
  $('#current-msg-display').val('')
}

// TODO: Fix states logic to ensure it is always proper
const setAuthState = (newState) => {
  // Establish a default state (initial login page)
  resetFields()
  $('#sign-up-form').hide()
  $('#change-password-form').hide()
  $('#sign-out-button').hide()
  $('#change-password-button').hide()
  $('#game-board').hide()
  $('#sign-in-form').show()
  $('#create-new-user-button').show()
  switch (newState) { // Make modifications to default state from parameter
    case 0: // Fresh page not signed in, almost everything hidden
      store.token = null // ensure that no user token exists in default state
      store.currentGame = null // Ensure there are no games active
      break

    case 1: // Create new user
      $('#sign-up-form').show()
      $('#create-new-user-button').hide()
      break

    case 2: // Signed in
      $('#create-new-user-button').hide()
      $('#sign-in-form').hide()
      $('#change-password-button').show()
      $('#sign-out-button').show()
      $('#game-board').show()
      break

    case 3: // Password change
      setAuthState(2)
      $('#change-password-button').hide()
      $('#change-password-form').show()
      break
  }
}

module.exports = {
  setAuthState
}
