import * as Requests from "modules/requests"
import { GeoJSON } from "modules/mapbox/geojsons/geojson"
import { Parcelle } from "modules/mapbox/geojsons/parcelle"

class Feuille extends GeoJSON {
  constructor(feature) {
    super(feature)
    this.parcelles = []
    this.map = null
    this.city = null
  }

  getParcelles() {
    if (this.properties.code_insee == 75056) {
      var param = { code_arr: this.properties.code_arr, section: this.properties.section }
    } else if (this.properties.code_insee == 13055) {
      var param = { code_arr: this.properties.code_arr, section: this.properties.section }
    } else if (this.properties.code_insee == 69123) {
      var param = { code_arr: this.properties.code_arr, section: this.properties.section }
    } else {
      var param = { code_insee: this.properties.code_insee, section: this.properties.section }
    }

    Requests.getAPICarto(param, { type: 'parcelle'})
      .then(data => {
        data.features.forEach(feature => {
          const parcelle = new Parcelle(feature)
          parcelle.map = this.map
          parcelle.city = this.city
          this.city.parcelles.push(parcelle)
          this.parcelles.push(parcelle)
        })
      })
      .catch (error => {
        console.log(error.message)
    })
  }
}

export { Feuille }
