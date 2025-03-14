async function getCommuneINSEE(nom) {
  var url = 'https://geo.api.gouv.fr/communes?nom=' + nom + '&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`statut de la réponse: ${response.status}`)
    } else {
      const json = await response.json()
      return json
    }
  } catch(error) {
    console.log(error)
  }
}

export { getCommuneINSEE }
