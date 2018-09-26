'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.failure)
}

const onSignIn = (event) => {
  // TODO: Fill in function
}

const onChangePassword = (event) => {
  // TODO: fill in function
}

const onSignOut = (event) => {
  // TODO: fill in function
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
