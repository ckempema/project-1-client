'use strict'

const store = require('../store.js')
const state = require('../states.js')

const signUpSuccess = (response) => {
  $('#auth_messages').html('')
  // TODO: Remove unnecessary data from output
  const userHTML = (`
    <h4> Success: Account Created!</h4>
    <p>User Email: ${response.user.email}</p>
    <p>ID: ${response.user.id}</p>
    <br />
    `)
  $('#auth_messages').append(userHTML)
  state.setAuthState(0)
}

const signInSuccess = (response) => {
  $('#auth_messages').html('')
  // TODO: Remove unnecessary data from output
  const userHTML = (`
    <h4> Success: Signed In!</h4>
    <p>User Email: ${response.user.email}</p>
    <p>ID: ${response.user.id}</p>
    <br />
    `)
  $('#auth_messages').append(userHTML)
  store.user = response.user
  state.setAuthState(2)
}

const changePasswordSuccess = (response) => {
  $('#auth_messages').html('')
  const outputHTML = (`
    <h4> Success: Password Changed!</h4>
    <br />
    `)
  $('#auth_messages').append(outputHTML)
  state.setAuthState(2)
}

const signOutSuccess = (response) => {
  $('#auth_messages').html('')
  const outputHTML = (`
    <h4> Success: Signed Out!</h4>
    <br />
    `)
  $('#auth_messages').append(outputHTML)
  store.user = null // remove all stored data on logout
  store.currentGame = null
  state.setAuthState(0)
}

// FIXME: Create failure functions for each possible state rather than a blanket case
const failure = (response) => {
  $('#content').html('')
  const responseHTML = (`
    <h3>ERROR: Something Failed. Go find it</h3>
    `)
  $('#content').append(responseHTML)
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  failure
}
