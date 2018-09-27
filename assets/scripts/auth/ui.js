'use strict'

const store = require('../store.js')
const state = require('../states.js')

const signUpSuccess = (response) => {
  $('#auth_messages').html('')
  // TODO: Remove unnecessary data from output
  const userHTML = (`
    <h4> New User: ${response.user.email}</h4>
    `)
  $('#auth_messages').append(userHTML)
  state.setAuthState(0)
}

const signInSuccess = (response) => {
  $('#auth_messages').html('')
  // TODO: Remove unnecessary data from output
  const userHTML = (`
    <h6>User X: ${response.user.email}<h6>
    `)
  $('#auth_messages').append(userHTML)
  store.user = response.user
  state.setAuthState(2)
}

const changePasswordSuccess = (response) => {
  $('#auth_messages').html('')
  const outputHTML = (`
    <h6>Password Changed!</h6>
    `)
  $('#auth_messages').append(outputHTML)
  state.setAuthState(2)
}

const signOutSuccess = (response) => {
  $('#auth_messages').html('')
  const outputHTML = (`
    <h4> Signed Out</h4>
    `)
  $('#auth_messages').append(outputHTML)
  store.user = null // remove all stored data on logout
  store.currentGame = null
  state.setAuthState(0)
}

// OPTIMIZE: Create failure functions for each possible state rather than a blanket case
const failure = (response) => {
  $('#auth_messages').html('')
  const responseHTML = (`
    <h3>ERROR: Failed to authenticate with server</h3>
    `)
  $('#auth_messages').append(responseHTML)
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  failure
}
