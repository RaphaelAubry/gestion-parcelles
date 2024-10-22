import * as Requests from "modules/requests"
import { GeoJSON } from "modules/mapbox/geojsons/geojson"
import { Parcelle } from "modules/mapbox/geojsons/parcelle"

class Feuille extends GeoJSON {
  constructor(feature) {
    super(feature)
    this.parcelles = []
    this.map = null
  }

  getParcelles() {
    Requests.getAPICarto({ code_insee: this.properties.code_insee, section: this.properties.section },
                     { type: 'parcelle'})
      .then(data => {
        data.features.forEach(feature => {
          const parcelle = new Parcelle(feature)
          parcelle.map = this.map
          this.parcelles.push(parcelle)
        })
      })
      .catch (error => {
        console.log(error.message)
    })
  }
}

export { Feuille }
