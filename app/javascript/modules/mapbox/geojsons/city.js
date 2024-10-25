import { GeoJSON } from "modules/mapbox/geojsons/geojson"
import sequence from 'modules/sequence'
import * as Requests from "modules/requests"
import { Feuille } from "modules/mapbox/geojsons/feuille"

class City extends GeoJSON {
  static default = {
    type: '',
    id: '',
    geometry: [],
    properties: {},
    geometry_name: 'geom',
    bbox: []
  }

  constructor(feature = City.default) {
    super(feature)
    this.feuilles = []
    this.parcelles = []
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
          feuille.city = this
          this.feuilles.push(feuille)
        })
      })
    .catch(error => {
      console.log(error.message)
    })
  }

  getParcelles() {
    this.feuilles.forEach(feuille => {
      feuille.parcelles.foEach(parcelle => {
        console.log(parcelle)
        this.parcelles.push(parcelle)
      })
    })
  }
}

export { City }
