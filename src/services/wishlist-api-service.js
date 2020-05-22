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
  // addToWishlist(title, description, genre, rating, release_date, developer, trailer_url, image_url_box_art, image_url_two, image_url_three, image_url_four, image_url_five) {
  //   return fetch(`${config.API_ENDPOINT}/games`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Bearer ${TokenService.getAuthToken()}`,
  //     },
  //     body: JSON.stringify({
  //       title,
  //       description,
  //       genre,
  //       rating,
  //       release_date,
  //       developer,
  //       trailer_url,
  //       image_url_box_art,
  //       image_url_two,
  //       image_url_three,
  //       image_url_four,
  //       image_url_five
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
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
