import { GeoJSON } from "modules/mapbox/geojsons/geojson"
import "turf"

class Parcelle extends GeoJSON {
  constructor(feature) {
    super(feature)
    this.tag_color = null
    this.map = null
    this.city = null
    this.polygon = turf.polygon(this.geometry.coordinates[0])
    this.centroid = turf.centroid(this.polygon)
    this.popup = null
    this.isRegistered = false
    this.bbox = turf.bbox(this.geometry)
  }

  includes(point) {
    if ('lat' in point && 'lng' in point) {
      const pt = turf.point([point.lng, point.lat])
      return turf.booleanPointInPolygon(pt, this.polygon)
    }
  }

  getCentroid() {
    return { lat: this.centroid.geometry.coordinates[1],
             lng: this.centroid.geometry.coordinates[0]
           }
  }

  isAlreadyDisplayed() {
    return this.map.parcelles.some(parcelle =>
      parcelle.centroid.geometry.coordinates[0] == this.centroid.geometry.coordinates[0] &&
      parcelle.centroid.geometry.coordinates[1] == this.centroid.geometry.coordinates[1]
    )
  }

  getNumero() {
    return this.properties.section + this.properties.numero
  }

  toJson() {
    var parcelle = { reference_cadastrale: this.getNumero(),
      code_officiel_geographique: this.properties.code_insee,
      polygon: this.polygon,
      surface: this.properties.contenance / 10000
    }
    return JSON.stringify(parcelle)
  }
}

export { Parcelle }
