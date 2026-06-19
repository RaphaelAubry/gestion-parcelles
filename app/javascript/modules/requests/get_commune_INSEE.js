async function getCommuneINSEE(nom) {
  const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(nom)}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`;
  try {
    const response = await fetch(url)

    if (!response.ok) {
      console.log('getCommuneINSEE')
      console.log(response.url)
      await response.text()
      throw new Error(`statut de la réponse: ${response.status}`)

    } else {
      const json = await response.json()
      return json
    }
  } catch(error) {
    console.log('getCommuneINSEE error:', error.message);
    return null
  }
}

export { getCommuneINSEE }
