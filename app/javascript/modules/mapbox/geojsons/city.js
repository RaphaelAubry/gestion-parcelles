import { GeoJSON } from './geojson'
import * as Requests from '../../requests'
import { Feuille } from './feuille'

class City extends GeoJSON {
  constructor(feature) {
    super(feature)
    this.feuilles = []
    this.map = null
  }

  getFeuilles() {
    Requests.getAPICarto({ code_insee: this.properties.code_insee }, { type: 'feuille' })
      .then(data => {
        const feuilles = data.features.map(feature => new Feuille(feature))
        feuilles.forEach(feuille => {
          feuille.getParcelles()
          feuille.map = this.map
          this.feuilles.push(feuille)
        })
      })
      .catch(error => {
        console.log(error.message)
    })
  }
}

export { City }
