'use strict'

const store = require('./store.js')

const resetFields = () => {
  // Reset every form field on the page to blank
  $('#sign-in-form').trigger('reset')
  $('#sign-up-form').trigger('reset')
  $('#change-password-form').trigger('reset')
  $('#get-game-form').trigger('reset')
  $('#game-board').trigger('reset')
  $('#data-msg-display').val('')
  $('#current-msg-display').val('')
}

const reset = () => {
  // Sets a base state of all data blanked on initial login page
  $('#sign-up-form').hide()

  // Hidden Auth controls
  $('#user-auth-buttons').hide()
  $('#change-password-form').hide()

  // Hidden Game info
  $('#game-board').hide()
  $('#game-data').hide()

  $('#retrieve-data').hide()
  // What to actually display
  $('#page-title').show()
  $('#sign-in-form').show()
  $('#create-new-user-button').show()
  resetFields()
  store.token = null // ensure that no user token exists in default state
  store.currentGame = null // Ensure there are no games active
  $('#data-msg-display').html('>')
  $('#current-msg-display').html('>')
  for (let i = 0; i < 9; i++) {
    $(`#game-box-${i}`).empty()
  }
}

const showCreateUser = () => {
  // Sets the page state after user clicks the create user button to show the create user form
  $('#sign-up-form').show()
  $('#create-new-user-button').hide()
}

const setSignedIn = () => {
  resetFields() // Empty all input fields
  // Auth data:
  $('#create-new-user-button').hide()
  $('#sign-up-form').hide()
  $('#sign-in-form').hide()
  $('#page-title').hide()

  $('#user-auth-buttons').show()
  $('#change-password-button').show()
  $('#show-data-buttons').show()

  // Game Data:
  $('#game-board').show() // Show all the data
  $('#game-data').show()

  $('#get-game-form').hide() // Then hide what shouldnt be displayed
  $('#retrieve-data').hide()
  $('#hide-select-game-button').hide()
  $('#hide-data-button').hide()
}

const showChangePassword = () => {
  $('#change-password-button').hide()
  $('#change-password-form').show()
}

const hideChangePassword = () => {
  $('#change-password-button').show()
  $('#change-password-form').hide()
}

const showRetrieveData = () => {
  $('#retrieve-data').show()
  $('#hide-data-button').show()
  $('#show-data-buttons').hide()
  // TODO fill in
}

const hideRetrieveData = () => {
  $('#hide-data-button').hide()
  $('#retrieve-data').hide()
  $('#show-data-buttons').show()
}

const showSelectGame = () => {
  $('#get-game-form').show()
  $('#hide-select-game-button').show()
  $('#get-game-button').hide()
}

const hideSelectGame = () => {
  $('#get-game-form').hide()
  $('#hide-select-game-button').hide()
  $('#get-game-button').show()
}

module.exports = {
  reset,
  showCreateUser,
  setSignedIn,
  showChangePassword,
  hideChangePassword,
  showRetrieveData,
  hideRetrieveData,
  showSelectGame,
  hideSelectGame
}
