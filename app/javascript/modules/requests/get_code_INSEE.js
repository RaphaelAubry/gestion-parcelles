async function getCodeINSEE(point) {
  if (point instanceof Object &&
      'lat' in point &&
      'lng' in point
      ) {
      const url = 'https://api-adresse.data.gouv.fr/reverse/'
      const query = 'lon=' + point.lng + '&lat=' + point.lat

      try {
        const response = await fetch(url + '?' + query)

        if (!response.ok) {
          console.log('getCodeINSEE')
          console.log(response.url)
          await response.text()
          throw new Error(`statut de la réponse: ${response.status}`)

        } else {
          const json = await response.json()

          if (json.features[0]) {
            return json.features[0].properties.citycode
          }
        }
      } catch (error) {
        console.log('getCodeINSEE error:', error.message);
        return null
      }

  } else {
    throw new Error('l\'argument doit être un objet point avec lat et lng')
  }
}

export { getCodeINSEE }
