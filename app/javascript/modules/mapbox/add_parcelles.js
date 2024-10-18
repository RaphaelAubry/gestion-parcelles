import mapboxgl from 'mapbox-gl'
import { Parcelle } from './geojsons/parcelle'

mapboxgl.Map.prototype.parcelles = []

mapboxgl.Map.prototype.addParcelles = function (parcelles) {
  parcelles.forEach(parcelle => {
    this.parcelles.push(
      new Parcelle({
        type: 'Feature',
        id: parcelle.id,
        geometry: {
          type: 'MultiPolygon',
          coordinates: [parcelle.coordinates]
        },
        properties: {
          reference_cadastrale: parcelle.attributes.reference_cadastrale,
          section: parcelle.attributes.reference_cadastrale.slice(0, 2),
          numero: parcelle.attributes.reference_cadastrale.slice(2, 6),
          contenance: parcelle.attributes.surface * 10000
        },
        geometry_name: 'geom',
        bbox: null,
        tag_color: parcelle.tag_color,
        map: this
      })
    )
  })
}
