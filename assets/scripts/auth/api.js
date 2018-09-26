'use strict'

const config = require('../config.js')

const signUp = (userData) => {
  // FIXME: Change to proper api calls
  console.log(userData)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: userData
  })
}

const signIn = (userData) => {
  // TODO: fill in function
}

const changePassword = (userData) => {
  // TODO: fill in function
}

const signOut = () => {
  // TODO: fill in function
}

module.export = {
  signUp,
  signIn,
  changePassword,
  signOut
}
