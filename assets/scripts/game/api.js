'use strict'
// NOTE: Different than API file for authentication calls
const config = require('../config.js')
const store = require('../store.js')

const newGame = () => {
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + '/games',
    method: 'POST'
  })
}

const pullGame = (gameID) => { // use api show action to get a game with given id
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + '/games',
    method: 'GET'
  })
}

const getAllGames = (over) => {
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + `/games[?over=${over}]`,
    method: 'GET'
  })
}

const updateGame = (id, update) => {
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + `/games/${id}`,
    method: 'PATCH',
    data: {
      game: {
        cell: {
          index: update.index,
          value: update.marker
        },
        over: update.over
      }
    }
  })
}

module.exports = {
  newGame,
  pullGame,
  getAllGames,
  updateGame
}
