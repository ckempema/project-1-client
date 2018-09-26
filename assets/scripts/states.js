const store = require('./store.js')

// FIXME: Fix states logic to ensure it is always proper
const setAuthState = (newState) => {
  // Establish a default state (initial login page)
  $('#sign-up-form').hide()
  $('#change-password-form').hide()
  $('#sign-out-button').hide()
  $('#change-password-button').hide()
  $('#game-board').hide()
  $('#sign-in-form').show()
  $('#create-user-button').show()
  switch (newState) { // Make modifications to default state from parameter
    case 0: // Fresh page not signed in, almost everything hidden
      store.user = null // ensure that no user token exists in default state
      break

    case 1: // Create new user
      $('#sign-up-form').show()
      $('#sign-in-form').hide()
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
      $('#change-password-form').show()
      break
  }
}

module.exports = {
  setAuthState
}
