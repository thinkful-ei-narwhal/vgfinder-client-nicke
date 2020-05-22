import config from '../config'
import TokenService from '../services/token-service'

const WishlistApiService = {
  getwishlistedGames(userId) {
    return fetch(`${config.API_ENDPOINT}/wishlists/users/${userId}`, {
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
  addToWishlist(userId, game_id) {
    return fetch(`${config.API_ENDPOINT}/wishlists/users/${userId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ game_id }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // removeFromWishlist(id) {
  //   return fetch(`${config.API_ENDPOINT}/games/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Bearer ${TokenService.getAuthToken()}`,
  //     }
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // }
}

export default WishlistApiService
