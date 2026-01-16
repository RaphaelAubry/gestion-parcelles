import { getMapboxToken } from "modules/requests"

async function getReverseGeocode(point) {
  if (point instanceof Object &&
      'lat' in point &&
      'lng' in point
      ) {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
        const coordinates = [point.lng, point.lat].join(',')
        const suffix = '.json'
        const token = '?access_token=' + await getMapboxToken()

        try {
          const response = await fetch(url + coordinates + suffix + token)

          if (!response.ok) {
            console.log('getReverseGeocode')
            console.log(response.url)
            throw new Error(`statut de la réponse: ${response.status}`)
          } else {
            const json = await response.json()
            if (json.features[0]) {
              return json.features[0]
            }
          }
        } catch (error) {
          console.log(error.message)
        }

      } else {
        throw new Error('l\'argument doit être un objet point avec lat et lng')
      }
}

export { getReverseGeocode }
