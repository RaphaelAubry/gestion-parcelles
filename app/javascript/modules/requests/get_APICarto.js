import merge from "modules/merge"

async function getAPICarto(params = {}, options = {}) {
    const url = 'https://apicarto.ign.fr/api/cadastre/'
    try {
        if (Object.values(params)[0]) {
          const response = await fetch(url + options.type + '?' + merge(params))
          if (!response.ok) {
            throw new Error(`statut de la réponse: ${response.status}`)
          } else {
            const json = await response.json()
            return json
          }
      }
      } catch (error) {
        console.log(error.message)
      }
}

export { getAPICarto }
