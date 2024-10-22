import { GeoJSON } from "modules/mapbox/geojsons/geojson"

class Parcelle extends GeoJSON {
  constructor(feature) {
    super(feature)
    this.tag_color = null
    this.map = null
    this.polygon = turf.polygon(this.geometry.coordinates[0])
    this.centroid = turf.centroid(this.polygon)
    this.popup = null
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

  fromDB() {
    return this.map.parcelles.some(parcelle =>
      parcelle.centroid.geometry.coordinates[0] == this.centroid.geometry.coordinates[0] &&
      parcelle.centroid.geometry.coordinates[1] == this.centroid.geometry.coordinates[1]
    )
  }

  getDescription() {
    return `<strong>Référence:</strong> ${this.properties.section}${this.properties.numero}<br />` +
      `<strong>Surface:<strong> ${this.properties.contenance / 10000} ha`
  }
}

export { Parcelle }
