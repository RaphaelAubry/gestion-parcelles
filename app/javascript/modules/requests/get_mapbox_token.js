async function getMapboxToken() {
  try {
    const response = await fetch("/mapbox_token", {
      headers: {
        "Accept": "application/json"
      }
    })

    if (!response.ok) {
      console.log('getMapboxToken')
      console.log(response.url)
      await response.text()
      throw new Error(`getMapboxToken statut de la réponse: ${response.status}`)

    } else {
      const data = await response.json()
      return data.token
    }
  } catch (error) {
    console.log('getMapBoxToken error:', error.message);
    return null
  }
}

export { getMapboxToken }
