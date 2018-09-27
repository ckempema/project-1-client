'use strict'
// NOTE: Different than API file for authentication calls
const config = require('../config.js')
const store = require('../store.js')

const newGame = () => {
  /* Create a new empty game from the server
  returns server response which contains a game object */
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + '/games',
    method: 'POST'
  })
}

const pullGame = (gameID) => {
  /* use api show action to request a game with given id, and return server response */
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + `/games/${gameID}`,
    method: 'GET'
  })
}

const getGames = (status) => {
  /* retrieve all games by user from server.
  returns object of all games
  ifOver parameter can be used to toggle all games or only finished games */
  console.log(`DEBUGGING: getGames called, status: ${status}`)
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + `/games/?over=${status}`,
    method: 'GET'
  })
}

const getAllGames = () => {
  /* retrieve all games by user from server.
  returns object of all games
  ifOver parameter can be used to toggle all games or only finished games */
  return $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiUrl + `/games`,
    method: 'GET'
  })
}

const updateGameServer = (id, update) => {
  /* Update a game with given id with an update containing the game status and a single cell update of the cells index and what marker to place
  returns the server response, which contains the game object */
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
  getGames,
  getAllGames,
  updateGameServer
}
