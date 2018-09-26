'use strict'
// NOTE: Different than API file for authentication calls
const config = require('../config.js')
const store = require('../store.js')

const newGame = (pwdData) => {
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + '/games',
    method: 'POST'
  })
}

module.exports = {
  newGame
}
