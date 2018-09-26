'use strict'

let apiUrl
const apiUrls = {
  // TODO: figure out proper URLs and replace
  production: '<replace-with-heroku-url>',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
