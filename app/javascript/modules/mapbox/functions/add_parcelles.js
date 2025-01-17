import mapboxgl from "mapbox-gl"
import { Parcelle } from "modules/mapbox/geojsons/parcelle"

mapboxgl.Map.prototype.parcelles = []

mapboxgl.Map.prototype.addParcelles = function(parcelles) {
  parcelles.forEach(parcelle => {
    var parcelle = new Parcelle({
      type: 'Feature',
      id: parcelle.id,
      geometry: {
        type: 'MultiPolygon',
        coordinates: [parcelle.coordinates]
      },
      properties: {
        reference_cadastrale: parcelle.properties.reference_cadastrale,
        section: parcelle.properties.reference_cadastrale.slice(0, 2),
        numero: parcelle.properties.reference_cadastrale.slice(2, 6),
        contenance: parcelle.properties.surface * 10000,
        code_insee: parcelle.properties.code_insee,
        tag_color: parcelle.properties.tag_color
      },
      geometry_name: 'geom',
      bbox: null
    })
    parcelle.map = this
    parcelle.isRegistered = true
    this.parcelles.push(parcelle)
  })
}
