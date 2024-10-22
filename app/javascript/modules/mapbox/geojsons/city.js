import { GeoJSON } from './geojson'
import * as Requests from '../../requests'
import { Feuille } from './feuille'
import { sequence } from '../../sequence'

class City extends GeoJSON {
  constructor(feature) {
    super(feature)
    this.feuilles = []
    this.map = null
  }

  getFeuilles() {
    if (sequence(75101, 75120, 1).includes(this.properties.code_insee)) {
      var param = { code_arr: this.properties.code_insee.slice(2) }

    } else if (sequence(13201, 13216, 1).includes(this.properties.code_insee)) {
      var param = { code_arr: this.properties.code_insee.slice(2) }

    } else if (sequence(69381, 69389, 1).includes(this.properties.code_insee)) {
      var param = { code_arr: this.properties.code_insee.slice(2) }

    } else {
      var param = { code_insee: this.properties.code_insee }
    }

    Requests.getAPICarto(param, { type: 'feuille' })
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
