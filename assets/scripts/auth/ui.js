'use strict'

const signUpSuccess = (response) => {
  console.log(response)
  $('#content').html('')
  const userHTML = (`
    <h4> Success: Account Created!</h4>
    <p>User Email: ${response.user.email}</p>
    <p>ID: ${response.user.id}</p>
    <p>Token: ${response.user.token}
    <br />
    `)
  $('#content').append(userHTML)
}

const signInSuccess = (response) => {
  // TODO: fill in function
}

const changePasswordSuccess = (response) => {
  // TODO: fill in function
}

const signOutSuccess = (response) => {
  // TODO: fill in function
}

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
