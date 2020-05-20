import config from '../config'
import TokenService from '../services/token-service'

const GamesApiService = {
  getGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getGame(gameId) {
    return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // getThingReviews(thingId) {
  //   return fetch(`${config.API_ENDPOINT}/things/${thingId}/reviews`, {
  //     headers: {
  //       'Authorization': `Bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
  // postReview(thingId, text, rating) {
  //   return fetch(`${config.API_ENDPOINT}/reviews`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Bearer ${TokenService.getAuthToken()}`,
  //     },
  //     body: JSON.stringify({
  //       thing_id: thingId,
  //       rating,
  //       text,
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // }
}

export default GamesApiService
