import { GeoJSON } from "./geojson"

class Parcelle extends GeoJSON {
  constructor(feature) {
    super(feature)
    this.tag_color = null
    this.map = null
  }

  includes(point) {
    if ('lat' in point && 'lng' in point) {
      const pt = turf.point([point.lng, point.lat])
      const poly = turf.polygon(this.geometry.coordinates[0])

      if (turf.booleanPointInPolygon(pt, poly)) {
        const source = this.map.getSource('parcelle')
        if (source) {
          source.setData({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: this.geometry.coordinates[0]
            }
          })
        }
      }
    }
  }
}

export { Parcelle }
